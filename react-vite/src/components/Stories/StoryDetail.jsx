
export default function StoryDetail({ story }) {
    return (
        <article>
            <h1>{story.title}</h1>
            <p>{story.content}</p>
            <p><strong>Location:</strong> {story.country}, {story.state_or_region}</p>
      {story.photos && story.photos.map(p => <img key={p.url} src={p.url} alt="" />)}
    </article>
  );
}
