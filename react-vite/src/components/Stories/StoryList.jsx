import React from "react";
import StoryListItem from './StoryListItem';

export default function ({ stories }) {
    return (
        <ul>
            {stories.map(story => (
                <StoryListItem key={story.id} story={story} />
            ))}
        </ul>
    );
}
