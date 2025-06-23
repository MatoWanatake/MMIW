import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import "./FollowingFollower.css";

export default function FollowingList() {
  const currentUser = useSelector((state) => state.session.user);
  const [following, setFollowing] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }

    async function fetchFollowing() {
      const res = await fetch(`/api/follow?follower_id=${currentUser.id}`, {
        credentials: "include",
      });

      if (res.ok) {
        const followData = await res.json();
        const userIds = followData.map((f) => f.followed_id);

        const users = await Promise.all(
          userIds.map((id) =>
            fetch(`/api/users/${id}`, { credentials: "include" }).then((res) => res.json())
          )
        );
        setFollowing(users);
      }
    }

    fetchFollowing();
  }, [currentUser, navigate]);

  return (
    <section className="follow-container">
      <h2 className="follow-title">People You Follow</h2>
      {following.length > 0 ? (
        following.map((user) => (
          <div key={user.id} className="follow-user-card">
            <Link to={`/users/${user.id}/stories`} className="follow-user-link">
              {user.username}
            </Link>
          </div>
        ))
      ) : (
        <p>You’re not following anyone yet.</p>
      )}
    </section>
  );
}
