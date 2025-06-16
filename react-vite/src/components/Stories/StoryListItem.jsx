import { Link } from 'react-router-dom'

export default function StoryListItem({ story }) {
    return (
        <li>
          <h2><Link to={`/stories/${story.id}`}>{story.title}</Link></h2>
          <p>{story.content.slice(0, 100)}…</p>
        </li>
      );
    }
