import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/follows";



export default function FollowButton({ user, currentUser }) {

  const dispatch = useDispatch();
  const follows = useSelector((state) => state.follows);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const currentFollow = follows.find(
      (f) => f.follower_id === currentUser.id && f.followed_id === user.id
    );
    setIsFollowing(!!currentFollow);
  }, [follows, currentUser.id, user.id]);


  const handleFollow = async () => {
    const result = await dispatch(followUser(user.id));
    if (!result?.error) {
      setIsFollowing(true);
    } else {
      console.log("Follow failed", result);
    }
  };

  const handleUnfollow = async () => {
    const currentFollow = follows.find(
      (f) => f.follower_id === currentUser.id && f.followed_id === user.id
    );
    if (currentFollow) {
      await dispatch(unfollowUser(currentFollow.id));
      setIsFollowing(false);
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
