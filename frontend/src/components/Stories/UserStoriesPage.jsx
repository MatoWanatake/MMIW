import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoriesByUser } from '../../redux/stories';
import StoryList from './StoryList';

export default function UserStoriesPage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const stories = useSelector(state => state.stories.userStories || []);

  useEffect(() => {
    dispatch(fetchStoriesByUser(userId));
  }, [dispatch, userId]);

  return (
    <div className="user-stories-page">
        <h2>User&apos;s Stories</h2>
      <StoryList stories={stories} />
    </div>
  );
}
