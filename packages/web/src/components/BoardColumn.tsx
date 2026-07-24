import { SavedItem } from '../lib/api';
import ItemCard from './ItemCard';

interface Props {
  title: string;
  items: SavedItem[];
  onDragStart: (item: SavedItem) => void;
  onDrop: () => void;
}

export default function BoardColumn({ title, items, onDragStart, onDrop }: Props) {
  return (
    <section
      className="board-column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
    >
      <h2>
        {title} <span className="count">{items.length}</span>
      </h2>
      <div className="board-column-items">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onDragStart={onDragStart} />
        ))}
        {items.length === 0 && <p className="muted small">Drop items here</p>}
      </div>
    </section>
  );
}
