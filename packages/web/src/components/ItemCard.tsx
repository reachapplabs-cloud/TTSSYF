import { SavedItem } from '../lib/api';

interface Props {
  item: SavedItem;
  onDragStart: (item: SavedItem) => void;
}

export default function ItemCard({ item, onDragStart }: Props) {
  const label = item.title || item.caption || item.url;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="item-card"
      draggable
      onDragStart={() => onDragStart(item)}
    >
      {item.thumbnailUrl ? (
        <img src={item.thumbnailUrl} alt="" loading="lazy" />
      ) : (
        <div className="item-card-placeholder" />
      )}
      <div className="item-card-body">
        <span className={`badge badge-${item.source.toLowerCase()}`}>
          {item.source === 'YOUTUBE' ? 'YouTube' : 'Instagram'}
        </span>
        <p className="item-card-title">{label}</p>
      </div>
    </a>
  );
}
