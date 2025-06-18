import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/follows";

export default function FollowButton({ user, currentUser }) {
  const dispatch = useDispatch();
  const follows = useSelector((state) => state.follows);

  if (!user || !currentUser) {
    console.log("FollowButton: user or currentUser is missing");
    return null;
  }

  const currentFollow = follows.find(
    (f) => f.follower_id === currentUser.id && f.followed_id === user.id
  );

  const handleFollow = () => {
    console.log("Following user ID:", user.id);
    dispatch(followUser(user.id));
  };

  const handleUnfollow = () => {
    console.log("Unfollowing follow ID:", currentFollow?.id);
    dispatch(unfollowUser(currentFollow.id));
  };

  return (
    <>
      {currentFollow ? (
        <button onClick={handleUnfollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </>
  );
}
