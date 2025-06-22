import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchStory } from '../../redux/stories';
import { deleteTag } from '../../redux/tags';
import FollowButton from '../Follows/FollowButton';
import EditStoryModal from './EditStoryModal';
import './StoryDetailPage.css';

export default function StoryDetailPage() {
  const dispatch = useDispatch();
  const { storyId } = useParams();
  const story = useSelector((state) => state.stories.current);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (storyId) dispatch(fetchStory(storyId));
  }, [dispatch, storyId]);

  const handleDeleteTag = (tagId) => {
    dispatch(deleteTag(tagId));
  };

  if (!story) return <p>Loading...</p>;

  return (
    <div className="story-detail-container">
      <h2>{story.title}</h2>
      <p>
        <strong>Author:</strong> {story.username}{' '}
        {currentUser && currentUser.id !== story.user_id && (
          <FollowButton
            user={{ id: story.user_id }}
            currentUser={currentUser}
          />
        )}
        {currentUser?.id === story.user_id && (
          <EditStoryModal story={story} />
        )}
      </p>
      <p><strong>Location:</strong> {story.state_or_region}, {story.country}</p>
      <p><strong>Status:</strong> {story.status || 'N/A'}</p>
      <p>{story.content}</p>

      {story.tags?.length > 0 && (
        <div className="story-tags">
          <strong>Tags:</strong>
          {story.tags.map((tag) => (
            <span key={tag.id} className="tag-pill">
              {tag.name}
              {currentUser?.id === story.user_id && (
                <button className="tag-delete" onClick={() => handleDeleteTag(tag.id)}>
                  ❌
                </button>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
