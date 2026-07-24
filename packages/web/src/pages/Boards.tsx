import { useEffect, useState } from 'react';
import { api, Category, SavedItem } from '../lib/api';
import { useAuth } from '../lib/auth';
import BoardColumn from '../components/BoardColumn';

export default function Boards() {
  const { token, user, signOut } = useAuth();
  const [items, setItems] = useState<SavedItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dragging, setDragging] = useState<SavedItem | null>(null);
  const [newBoardName, setNewBoardName] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!token) return;
    const [{ items: fetchedItems }, { categories: fetchedCategories }] = await Promise.all([
      api.listItems(token),
      api.listCategories(token),
    ]);
    setItems(fetchedItems);
    setCategories(fetchedCategories);
  }

  useEffect(() => {
    load().catch((err) => setError(err instanceof Error ? err.message : String(err)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function moveItem(item: SavedItem, categoryId: string | null) {
    if (!token) return;
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, categoryId } : i)));
    try {
      await api.updateItemCategory(token, item.id, categoryId);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      load();
    }
  }

  async function createBoard(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !newBoardName.trim()) return;
    try {
      await api.createCategory(token, newBoardName.trim());
      setNewBoardName('');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  async function syncYoutube() {
    if (!token) return;
    setSyncing(true);
    setError(null);
    try {
      await api.syncYoutube(token);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSyncing(false);
    }
  }

  const uncategorized = items.filter((item) => !item.categoryId);

  return (
    <div className="boards-page">
      <header className="top-bar">
        <h1>Ugram</h1>
        <div className="top-bar-actions">
          <button onClick={syncYoutube} disabled={syncing}>
            {syncing ? 'Syncing…' : 'Sync YouTube'}
          </button>
          <form onSubmit={createBoard} className="new-board-form">
            <input
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="New board name"
            />
            <button type="submit">Add board</button>
          </form>
          <span className="muted small">{user?.email}</span>
          <button className="link" onClick={signOut}>
            Sign out
          </button>
        </div>
      </header>

      {error && <p className="error">{error}</p>}

      <div className="board-columns">
        <BoardColumn
          title="Uncategorized"
          items={uncategorized}
          onDragStart={setDragging}
          onDrop={() => dragging && moveItem(dragging, null)}
        />
        {categories.map((category) => (
          <BoardColumn
            key={category.id}
            title={category.name}
            items={items.filter((item) => item.categoryId === category.id)}
            onDragStart={setDragging}
            onDrop={() => dragging && moveItem(dragging, category.id)}
          />
        ))}
      </div>
    </div>
  );
}
