import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsByStory, createComment } from "../../redux/comments";
import { selectCurrentUser } from "../../redux/session";
import CommentList from "./CommentList";
import { useParams } from "react-router-dom";
import "./CommentSection.css";

export default function CommentSection() {
  const { storyId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const currentUser = useSelector(selectCurrentUser);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(fetchCommentsByStory(storyId));
  }, [dispatch, storyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setErrors(["Comment cannot be empty or just spaces."]);
      return;
    }

    const payload = {
      story_id: Number(storyId),
      content,
    };

    console.log("createComment payload:", payload);

    const res = await dispatch(createComment(payload));

    if (res.errors) {
      setErrors(Object.values(res.errors));
    } else {
      setContent("");
      setErrors([]);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>

      {comments.length === 0 && <p>No comments yet.</p>}
      <CommentList comments={comments} />

      {currentUser && (
        <form onSubmit={handleSubmit}>
          {errors.map((e) => (
            <p key={e} className="error">{e}</p>
          ))}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button type="submit">Post Comment</button>
        </form>
      )}
    </div>
  );
}
