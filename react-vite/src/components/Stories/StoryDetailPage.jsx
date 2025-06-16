import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStory,
  deleteStory,
  selectCurrentStory
} from "../../redux/stories";
import { selectCurrentUser } from "../../redux/session";
import StoryDetail from "./StoryDetail";
import EditStoryForm from "./EditStoryForm";
import CommentSection from "../Comments/CommentSection";
import { fetchTags, createTag, deleteTag } from "../../redux/tags";

export default function StoryDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const story = useSelector(selectCurrentStory);
  const currentUser = useSelector(selectCurrentUser);
  const tags = useSelector((state) => state.tags);
  const [showEdit, setShowEdit] = useState(false);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    dispatch(fetchStory(id));
    dispatch(fetchTags(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this story?")) {
      const success = await dispatch(deleteStory(story.id));
      if (success) navigate("/stories");
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim()) {
      dispatch(createTag(newTag.trim(), id));
      setNewTag("");
    }
  };

  if (!story) return <p>Loading...</p>;

  return (
    <div>
      <StoryDetail story={story} />

      {currentUser?.id === story.user_id && (
        <>
          {!showEdit && <button onClick={() => setShowEdit(true)}>Edit</button>}
          <button onClick={handleDelete}>Delete</button>
        </>
      )}

      {showEdit && (
        <EditStoryForm
          story={story}
          onClose={() => {
            setShowEdit(false);
            dispatch(fetchStory(id));
          }}
        />
      )}

      <section>
        <h4>Tags</h4>
        <ul>
        {(tags || []).map((tag) => (
  <li key={tag.id}>
    {tag.name}
    <button onClick={() => dispatch(deleteTag(tag.id))}>x</button>
  </li>
))}

        </ul>
        <form onSubmit={handleAddTag}>
          <input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add tag"
          />
          <button type="submit">Add</button>
        </form>
      </section>

      <CommentSection storyId={story.id} />
    </div>
  );
}
