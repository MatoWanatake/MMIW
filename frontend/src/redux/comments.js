// action types

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';

// Action creators

const loadcomments = (comments) => ({ type: LOAD_COMMENTS, comments });
const addComment = (comment) => ({ type: ADD_COMMENT, comment });
const updateCommentAC = (comment) => ({ type: UPDATE_COMMENT, comment });
const removeComment = (id) => ({ type: REMOVE_COMMENT, id });

// THUNKS

// fetch all comments for a story

export const fetchCommentsByStory = (storyId) => async (dispatch) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comments?story_id=${storyId}`, {
        credentials: 'include'
      });
          if (res.ok) {
        const data = await res.json();
        dispatch(loadcomments(data));
    }
};

// create a comment

export const createComment = ({ story_id, content }) => async (dispatch) => {

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ story_id, content })  // ✅ send flat object
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addComment(data));
      return data;
    }
    return await res.json(); // should return error object if 400
  };






// update a comment

export const updateComment = (id, content) => async (dispatch) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content })
      });


    if (res.ok) {
        const data = await res.json();
        dispatch(updateCommentAC(data));
        return data;
    }
    return await res.json();
};

// Delete a comment

export const deleteComment = (id) => async (dispatch) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comments/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });


    if (res.ok) {
        dispatch(removeComment(id));
        return true;
    }
    return false;
};

// REDUCER

const initialState = [];

export default function commentsReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_COMMENTS:
            return action.comments;
        case ADD_COMMENT:
            return [...state, action.comment];
        case UPDATE_COMMENT:
            return state.map((c) => (c.id === action.comment.id ? action.comment : c));
        case REMOVE_COMMENT:
            return state.filter((c) => c.id !== action.id);
        default:
            return state;
    }
}
