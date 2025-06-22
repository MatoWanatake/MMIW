import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCard from "../Users/UserCard";
import "./FollowingFollower.css";

export default function FollowersList() {
  const currentUser = useSelector((state) => state.session.user);
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }

    async function fetchFollowers() {
      const res = await fetch(`/api/follow?followed_id=${currentUser.id}`, {
        credentials: "include",
      });
      if (res.ok) {
        const followData = await res.json();
        const userIds = followData.map((f) => f.follower_id);

        const users = await Promise.all(
          userIds.map((id) =>
            fetch(`/api/users/${id}`, { credentials: "include" }).then((res) => res.json())
          )
        );
        setFollowers(users);
      }
    }

    fetchFollowers();
  }, [currentUser, navigate]);

  return (
    <section className="follow-container">
      <h2 className="follow-title">Your Followers</h2>
      {followers.length > 0 ? (
        followers.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <p>You have no followers yet.</p>
      )}
    </section>
  );
}
