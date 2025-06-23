import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/comments";
import { selectCurrentUser } from "../../redux/session";
import EditCommentForm from "./EditCommentForm";
import './CommentItem.css'; // <-- Make sure this file exists and is correctly named

export default function CommentItem({ comment }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    await dispatch(deleteComment(comment.id));
  };

  return (
    <div className="comment-item">
      <strong>{comment.username || 'User'}:</strong>
      {isEditing ? (
        <EditCommentForm comment={comment} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          <p>{comment.content}</p>
          {currentUser?.id === comment.user_id && (
            <div className="comment-buttons">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
