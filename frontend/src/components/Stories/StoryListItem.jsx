import { Link } from 'react-router-dom';
import './StoryListItem.css';

export default function StoryListItem({ story }) {
  return (
    <div className="story-card">
      <h2>
        <Link to={`/stories/${story.id}`}>{story.title}</Link>
      </h2>
      <p>{story.content.slice(0, 100)}…</p>
      <p className="story-author">By: {story.username}</p>
    </div>
  );
}
