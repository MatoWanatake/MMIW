import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/comments";
import { selectCurrentUser } from "../../redux/session";
import EditCommentForm from "./EditCommentForm";

export default function CommentItem({ comment }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async () => {
        await dispatch(deleteComment(comment.id));
    };

    return (
        <div style={{ marginBottom: '10px' }}>
        <strong>{comment.user?.username || 'User'}:</strong>
        {isEditing ? (
          <EditCommentForm comment={comment} onClose={() => setIsEditing(false)} />
        ) : (
          <>
            <p>{comment.content}</p>
            {currentUser?.id === comment.user_id && (
              <>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </>
            )}
          </>
        )}
      </div>
    );
  }
