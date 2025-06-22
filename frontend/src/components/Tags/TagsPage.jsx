import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTags } from "../../redux/tags";
import TagList from "./TagList";

export default function TagsPage() {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(fetchAllTags());
  }, [dispatch]);

  return (
    <div>
      <h2>All Tags</h2>
      <TagList tags={tags} />
    </div>
  );
}
