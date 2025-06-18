import StoryListItem from './StoryListItem';

export default function StoryList({ stories }) {
  return (
    <div className="story-list">
      <ul>
        {stories.map(story => (
          <StoryListItem key={story.id} story={story} />
        ))}
      </ul>
    </div>
  );
}
