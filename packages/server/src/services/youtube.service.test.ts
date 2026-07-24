import { beforeEach, describe, expect, it, vi } from 'vitest';

const channelsList = vi.fn();
const playlistsList = vi.fn();
const playlistItemsList = vi.fn();
const setCredentials = vi.fn();

vi.mock('googleapis', () => ({
  google: {
    auth: {
      OAuth2: vi.fn().mockImplementation(() => ({ setCredentials })),
    },
    youtube: vi.fn().mockImplementation(() => ({
      channels: { list: channelsList },
      playlists: { list: playlistsList },
      playlistItems: { list: playlistItemsList },
    })),
  },
}));

const { prisma } = await import('../db');
const { resetDb, createTestUser } = await import('../test/helpers');
const { syncYoutubeForUser } = await import('./youtube.service');

beforeEach(async () => {
  await resetDb();
  channelsList.mockReset();
  playlistsList.mockReset();
  playlistItemsList.mockReset();
  setCredentials.mockReset();

  channelsList.mockResolvedValue({
    data: { items: [{ contentDetails: { relatedPlaylists: { likes: 'LL_LIKES' } } }] },
  });
  playlistsList.mockResolvedValue({
    data: { items: [{ id: 'PL1', snippet: { title: 'My Playlist' } }], nextPageToken: undefined },
  });
  playlistItemsList.mockImplementation(async ({ playlistId }: { playlistId: string }) => {
    if (playlistId === 'LL_LIKES') {
      return {
        data: {
          items: [
            {
              contentDetails: { videoId: 'vid-liked' },
              snippet: {
                title: 'Liked Video',
                thumbnails: { medium: { url: 'https://img/liked.jpg' } },
                videoOwnerChannelTitle: 'Channel A',
                publishedAt: '2024-01-01T00:00:00Z',
              },
            },
          ],
          nextPageToken: undefined,
        },
      };
    }
    return {
      data: {
        items: [
          {
            contentDetails: { videoId: 'vid-playlist' },
            snippet: {
              title: 'Playlist Video',
              thumbnails: { default: { url: 'https://img/playlist.jpg' } },
              videoOwnerChannelTitle: 'Channel B',
              publishedAt: '2024-02-01T00:00:00Z',
            },
          },
        ],
        nextPageToken: undefined,
      },
    };
  });
});

describe('syncYoutubeForUser', () => {
  it('throws when the user has not connected Google', async () => {
    const { user } = await createTestUser({ googleRefreshToken: undefined });
    await expect(syncYoutubeForUser(user)).rejects.toThrow(/connected/i);
  });

  it('syncs Liked videos and every playlist into SavedItem rows', async () => {
    const { user } = await createTestUser({ googleRefreshToken: 'refresh-token' });

    const result = await syncYoutubeForUser(user);
    expect(result).toEqual({ playlists: 2, items: 2 });

    const items = await prisma.savedItem.findMany({
      where: { userId: user.id, source: 'YOUTUBE' },
      orderBy: { externalId: 'asc' },
    });
    expect(items).toHaveLength(2);

    const liked = items.find((i) => i.externalId === 'vid-liked')!;
    expect(liked.sourceCollection).toBe('Liked videos');
    expect(liked.url).toBe('https://www.youtube.com/watch?v=vid-liked');
    expect(liked.author).toBe('Channel A');

    const playlist = items.find((i) => i.externalId === 'vid-playlist')!;
    expect(playlist.sourceCollection).toBe('My Playlist');
  });

  it('is idempotent — re-syncing upserts rather than duplicating', async () => {
    const { user } = await createTestUser({ googleRefreshToken: 'refresh-token' });

    await syncYoutubeForUser(user);
    await syncYoutubeForUser(user);

    const items = await prisma.savedItem.findMany({ where: { userId: user.id, source: 'YOUTUBE' } });
    expect(items).toHaveLength(2);
  });
});
