import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser, fetchFollows } from "../../redux/follows";



export default function FollowButton({ user, currentUser }) {

  const dispatch = useDispatch();
  const follows = useSelector((state) => state.follows);
  const [isFollowing, setIsFollowing] = useState(false);
  console.log("Rendering FollowButton");
console.log("user.id:", user?.id);
console.log("currentUser.id:", currentUser?.id);

console.log("follows:", follows);
  useEffect(() => {
    const currentFollow = follows.find(
      (f) => f.follower_id === currentUser.id && f.followed_id === user.id
    );
    console.log("Detected currentFollow:", currentFollow);
    setIsFollowing(!!currentFollow);
  }, [follows, currentUser.id, user.id]);


  const handleFollow = async () => {
    console.log("Attempting to follow", user.id);
    const result = await dispatch(followUser(user.id));
    if (!result?.error) {
      setIsFollowing(true);
      console.log("Follow succeeded");
    } else {
      console.log("Follow failed", result);
    }
  };

  const handleUnfollow = async () => {
    console.log("Attempting to unfollow", user.id);
    const currentFollow = follows.find(
      (f) => f.follower_id === currentUser.id && f.followed_id === user.id
    );
    if (currentFollow) {
      await dispatch(unfollowUser(currentFollow.id));
      setIsFollowing(false);
      console.log("Unfollow succeeded");
    } else {
      console.log("No follow found to unfollow");
    }
  };


  if (!user || !currentUser || currentUser.id === user.id) return null;

  return (
    <>
      {isFollowing ? (
        <button className="follow-button" onClick={handleUnfollow}>
          Unfollow
        </button>
      ) : (
        <button className="follow-button" onClick={handleFollow}>
          Follow
        </button>
      )}
    </>
  );
}
