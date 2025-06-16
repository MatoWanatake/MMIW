import { useSelector } from "react-redux";
import FollowButton from '../follows/FollowButton';

export default function UserCard({ user }) {
    const currentUser = useSelector((state) => state.session.user);

    if (user.id === currentUser?.id) return null;

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h4>{user.username}</h4>
          <FollowButton user={user} currentUser={currentUser} followeeId={user.id} />
        </div>
      );
    }
