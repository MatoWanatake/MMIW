import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createStory } from '../../redux/stories';
import { createTag } from '../../redux/tags';
import './StoriesPage.css';

export default function CreateStoryForm({ onClose = () => {}, showSuccessMessage = false }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [country, setCountry] = useState('');
  const [stateOrRegion, setStateOrRegion] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = (e) => {
    e.preventDefault();
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!title.trim()) validationErrors.title = "Title is required.";
    if (!content.trim()) validationErrors.content = "Content is required.";
    if (!country.trim()) validationErrors.country = "Country is required.";
    if (!stateOrRegion.trim()) validationErrors.stateOrRegion = "State or Region is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      title: title.trim(),
      content: content.trim(),
      country: country.trim(),
      state_or_region: stateOrRegion.trim(),
      status: status.trim(),
      tags
    };

    const res = await dispatch(createStory(payload));

    if (res.error) {
      setErrors({ general: res.error });
    } else {
      const storyId = res.id;
      for (let tagName of tags) {
        await dispatch(createTag(tagName, storyId));
      }

      if (showSuccessMessage) {
        setSubmitted(true);
      } else {
        onClose();
      }
    }
  };

  return (
    <div className="create-story-wrapper">
      {submitted ? (
        <p>Story created successfully.</p>
      ) : (
        <form className="story-form" onSubmit={handleSubmit}>
          <h2>New Story</h2>

          {Object.values(errors).map((msg, idx) => (
            <p key={idx} className="error">{msg}</p>
          ))}

          <input
            name="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="content"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            name="country"
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            name="stateOrRegion"
            type="text"
            placeholder="State / Region"
            value={stateOrRegion}
            onChange={(e) => setStateOrRegion(e.target.value)}
          />
          <input
            name="status"
            type="text"
            placeholder="Status (optional)"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <div className="tag-input-wrapper">
            <input
              type="text"
              placeholder="Enter tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button type="button" onClick={handleAddTag}>
              Add Tag
            </button>
          </div>

          <div className="tag-preview">
            {tags.map((tag, idx) => (
              <span key={idx} className="tag-pill">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)}>

                </button>
              </span>
            ))}
          </div>

          <button type="submit">Create</button>
        </form>
      )}
    </div>
  );
}
