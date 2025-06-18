import CommentItem from "./CommentItem";

export default function CommentList({ comments }) {
    return (
        <>
            {comments.map((comment) => (
             <CommentItem key={comment.id} comment={comment} />
            ))}
        </>
    );
}
