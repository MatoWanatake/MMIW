import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../Users/UserCard";
import "./FollowingFollower.css";

export default function FollowingList() {
  const currentUser = useSelector((state) => state.session.user);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFollowing() {
      const res = await fetch(`/api/follow?follower_id=${currentUser.id}`, {
        credentials: "include",
      });
      if (res.ok) {
        const followData = await res.json();
        const userIds = followData.map((f) => f.followed_id);

        const userPromises = userIds.map((id) =>
          fetch(`/api/users/${id}`, { credentials: "include" }).then((res) =>
            res.json()
          )
        );
        const users = await Promise.all(userPromises);
        setFollowing(users);
      }
      setLoading(false);
    }

    fetchFollowing();
  }, [currentUser.id]);

  if (loading) return <p>Loading...</p>;

  return (
    <section className="follow-container">
      <h2 className="follow-title">People You Follow</h2>
      {following.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </section>
  );
}
