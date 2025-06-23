// action types

const SET_TAGS = 'tags/SET_TAGS';
const ADD_TAG = 'tags/ADD_TAG';
const DELETE_TAG = 'tags/DELETE_TAG';

const setTags = (tags) => ({ type: SET_TAGS, tags });
const addTag = (tag) => ({ type: ADD_TAG, tag });
const removeTag = (tagId) => ({ type: DELETE_TAG, tagId });

// fetch tags for a story
export const fetchTags = (storyId) => async (dispatch) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tags?story_id=${storyId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setTags(data));
  }
};

// create tag for a story
export const createTag = (tagName, storyId) => async (dispatch) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name: tagName, story_id: storyId })
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addTag(data));
  }
};

// fetch all tags
export const fetchAllTags = () => async (dispatch) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tags`, {
    credentials: 'include'
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(setTags(data));
  }
};

// delete a tag
export const deleteTag = (tagId) => async (dispatch) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tags/${tagId}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (res.ok) {
    dispatch(removeTag(tagId));
  } else {
    const error = await res.json();
    console.error("Tag delete error:", error);
  }
};


// reducer
const tagsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TAGS:
      return action.tags;
    case ADD_TAG:
      return [...state, action.tag];
    case DELETE_TAG:
      return state.filter((tag) => tag.id !== action.tagId);
    default:
      return state;
  }
};

export default tagsReducer;
