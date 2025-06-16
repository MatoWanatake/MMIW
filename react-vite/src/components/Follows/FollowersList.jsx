import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../Users/UserCard";

export default function FollowersList() {
  const currentUser = useSelector((state) => state.session.user);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFollowers() {
      const res = await fetch(`/api/follow?followed_id=${currentUser.id}`, {
        credentials: "include",
      });
      if (res.ok) {
        const followData = await res.json();
        const userIds = followData.map((f) => f.follower_id);

        const userPromises = userIds.map((id) =>
          fetch(`/api/users/${id}`, { credentials: "include" }).then((res) =>
            res.json()
          )
        );
        const users = await Promise.all(userPromises);
        setFollowers(users);
        setLoading(false);
      }
    }

    fetchFollowers();
  }, [currentUser.id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Followers</h2>
      {followers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
