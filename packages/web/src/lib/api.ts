import { API_BASE_URL } from '../config';

export interface Category {
  id: string;
  name: string;
  color: string | null;
  _count: { items: number };
}

export interface SavedItem {
  id: string;
  source: 'YOUTUBE' | 'INSTAGRAM';
  title: string | null;
  caption: string | null;
  url: string;
  thumbnailUrl: string | null;
  author: string | null;
  sourceCollection: string | null;
  savedAt: string | null;
  categoryId: string | null;
  category: Category | null;
}

export interface Me {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  youtubeConnected: boolean;
}

async function request<T>(path: string, token: string | null, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data as T;
}

export const api = {
  exchangeGoogleCode: (code: string, redirectUri: string) =>
    request<{ token: string; user: Me }>('/api/auth/google/callback', null, {
      method: 'POST',
      body: JSON.stringify({ code, redirectUri }),
    }),

  me: (token: string) => request<{ user: Me }>('/api/me', token),

  syncYoutube: (token: string) =>
    request<{ playlists: number; items: number }>('/api/youtube/sync', token, { method: 'POST' }),

  listItems: (token: string, params: { categoryId?: string; source?: string } = {}) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return request<{ items: SavedItem[] }>(`/api/items${query ? `?${query}` : ''}`, token);
  },

  updateItemCategory: (token: string, itemId: string, categoryId: string | null) =>
    request<{ item: SavedItem }>(`/api/items/${itemId}`, token, {
      method: 'PATCH',
      body: JSON.stringify({ categoryId: categoryId ?? 'none' }),
    }),

  listCategories: (token: string) => request<{ categories: Category[] }>('/api/categories', token),

  createCategory: (token: string, name: string) =>
    request<{ category: Category }>('/api/categories', token, {
      method: 'POST',
      body: JSON.stringify({ name }),
    }),
};
