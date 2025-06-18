import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStory, selectCurrentStory } from "../../redux/stories";
import EditStoryForm from "./EditStoryForm";

export default function EditStoryPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const story = useSelector(selectCurrentStory);

  useEffect(() => {
    dispatch(fetchStory(id));
  }, [dispatch, id]);

  if (!story) return <p>Loading…</p>;

  const handleClose = () => {
    navigate(`/stories/${id}`);
  };

  return (
    <div className="edit-story-page">
      <h2>Edit Story</h2>
      <EditStoryForm story={story} onClose={handleClose} />
    </div>
  );
}
