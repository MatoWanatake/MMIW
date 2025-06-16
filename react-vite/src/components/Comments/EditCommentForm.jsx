import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateComment } from '../../redux/comments'

export default function EditCommentForm({ comment, onClose}) {
    const dispatch = useDispatch();
    const [content, setContent] = useState(comment.content);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(updateComment(comment.id, content));
        if (res.error) {
            setErrors([res.error]);
        } else {
            setErrors([]);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errors.map((e) => (
                <p key={e} className="error">{e}</p>

            ))}
            <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            />
            <button type='submit'>Save</button>
            <button type='button' onClick={onClose}>Cancel</button>
        </form>
    );
}
