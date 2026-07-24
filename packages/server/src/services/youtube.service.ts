import { google, youtube_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { User } from '@prisma/client';
import { prisma } from '../db';
import { env } from '../env';

function getOAuthClient(user: User): OAuth2Client {
  const client = new google.auth.OAuth2(env.googleClientId, env.googleClientSecret);
  client.setCredentials({ refresh_token: user.googleRefreshToken ?? undefined });
  return client;
}

interface YoutubeVideoRecord {
  externalId: string;
  title: string | null;
  url: string;
  thumbnailUrl: string | null;
  author: string | null;
  sourceCollection: string;
  savedAt: Date | null;
}

async function listAllPlaylistItems(
  youtube: youtube_v3.Youtube,
  playlistId: string,
  playlistTitle: string,
): Promise<YoutubeVideoRecord[]> {
  const records: YoutubeVideoRecord[] = [];
  let pageToken: string | undefined;

  do {
    const { data } = await youtube.playlistItems.list({
      part: ['snippet', 'contentDetails'],
      playlistId,
      maxResults: 50,
      pageToken,
    });

    for (const item of data.items ?? []) {
      const videoId = item.contentDetails?.videoId;
      if (!videoId) continue;

      records.push({
        externalId: videoId,
        title: item.snippet?.title ?? null,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnailUrl:
          item.snippet?.thumbnails?.medium?.url ?? item.snippet?.thumbnails?.default?.url ?? null,
        author: item.snippet?.videoOwnerChannelTitle ?? null,
        sourceCollection: playlistTitle,
        savedAt: item.snippet?.publishedAt ? new Date(item.snippet.publishedAt) : null,
      });
    }

    pageToken = data.nextPageToken ?? undefined;
  } while (pageToken);

  return records;
}

/**
 * Fetches the user's playlists (+ Liked videos) and syncs every video into
 * SavedItem. Idempotent: re-running just upserts on (userId, source, externalId).
 *
 * Note: YouTube's "Watch Later" playlist is not readable via the public API
 * (Google withdrew third-party access), so it's intentionally not included.
 */
export async function syncYoutubeForUser(user: User) {
  if (!user.googleRefreshToken) {
    throw new Error('User has not connected a Google/YouTube account');
  }

  const auth = getOAuthClient(user);
  const youtube = google.youtube({ version: 'v3', auth });

  const collections: { id: string; title: string }[] = [];

  const { data: channelData } = await youtube.channels.list({
    part: ['contentDetails'],
    mine: true,
  });
  const likesPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.likes;
  if (likesPlaylistId) {
    collections.push({ id: likesPlaylistId, title: 'Liked videos' });
  }

  let pageToken: string | undefined;
  do {
    const { data } = await youtube.playlists.list({
      part: ['snippet'],
      mine: true,
      maxResults: 50,
      pageToken,
    });
    for (const playlist of data.items ?? []) {
      if (playlist.id && playlist.snippet?.title) {
        collections.push({ id: playlist.id, title: playlist.snippet.title });
      }
    }
    pageToken = data.nextPageToken ?? undefined;
  } while (pageToken);

  let itemCount = 0;

  for (const collection of collections) {
    const records = await listAllPlaylistItems(youtube, collection.id, collection.title);
    for (const record of records) {
      await prisma.savedItem.upsert({
        where: {
          userId_source_externalId: {
            userId: user.id,
            source: 'YOUTUBE',
            externalId: record.externalId,
          },
        },
        update: {
          title: record.title,
          url: record.url,
          thumbnailUrl: record.thumbnailUrl,
          author: record.author,
          sourceCollection: record.sourceCollection,
          savedAt: record.savedAt,
        },
        create: {
          userId: user.id,
          source: 'YOUTUBE',
          externalId: record.externalId,
          title: record.title,
          url: record.url,
          thumbnailUrl: record.thumbnailUrl,
          author: record.author,
          sourceCollection: record.sourceCollection,
          savedAt: record.savedAt,
        },
      });
      itemCount += 1;
    }
  }

  return { playlists: collections.length, items: itemCount };
}
