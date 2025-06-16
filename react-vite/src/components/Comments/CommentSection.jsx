import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCommentsByStory, createComment
} from '../../redux/comments'
import { selectCurrentUser } from "../../redux/session";
import CommentList from "./CommentList";

export default function CommentSection({ storyId }) {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments);
    const currentUser = useSelector(selectCurrentUser);
    const [content, setContent] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(fetchCommentsByStory(storyId));
    }, [dispatch, storyId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(createComment({ story_id: storyId, content }));
        if (res.error) {
            setErrors([res.error]);
        } else {
            setContent('');
            setErrors([]);
        }
    };

    return (
        <div>
            <h3>Comments</h3>

            {comments.length === 0 && <p>No Comments yet</p>}

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
