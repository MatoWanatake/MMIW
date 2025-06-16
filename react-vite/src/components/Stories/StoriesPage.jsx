import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStories, selectAllStories } from "../../redux/stories";
import StoryList from "./StoryList"

export default function StoryListPage() {
    const dispatch = useDispatch();
    const stories = useSelector(selectAllStories)
    useEffect(() => {
        dispatch(fetchStories());
    }, [dispatch])

    if (!stories) return <p>Loading stories...</p>;

    return <StoryList stories={stories} />
}
