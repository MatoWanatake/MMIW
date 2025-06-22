import "./TagList.css";

export default function TagList({ tags = {}, onDelete }) {
  const tagArray = Object.values(tags);

  return (
    <div className="tag-list">
      {tagArray.map(tag => (
        <div className="tag-item" key={tag.id}>
          <span>{tag.name}</span>
          {onDelete && (
            <button className="delete-tag-btn" onClick={() => onDelete(tag.id)}>
              &times;
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
