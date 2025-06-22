// action types

const ADD_FOLLOW = 'follows/ADD_FOLLOW';
const REMOVE_FOLLOW = 'follows/REMOVE_FOLLOW';
const SET_FOLLOWS = 'follows/SET_FOLLOWS';

// action creators

const addFollow = (follow) => ({ type: ADD_FOLLOW, follow });
const removeFollow = (followId) => ({ type: REMOVE_FOLLOW,followId });
const setFollows = (follows) => ({ type: SET_FOLLOWS, follows });

// Thunks

// grabs cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


// follow a user

export const followUser = (followee_id) => async (dispatch) => {
    const res = await fetch('/api/follow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrf_token')
      },
      credentials: 'include',
      body: JSON.stringify({ followed_id: followee_id })
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addFollow(data));
      dispatch(fetchFollows());
      return data;
    }

    const err = await res.json();
    console.error("Follow error:", err);
    return err;
  };


// unfollow a user

export const unfollowUser = (follow_id) => async (dispatch) => {
    const res = await fetch(`http://localhost:8000/api/follow/${follow_id}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (res.ok) {
        dispatch(removeFollow(follow_id));
        dispatch(fetchFollows());

        return true;
    }
    return false;
}

// fetch follows

export const fetchFollows = () => async (dispatch) => {
    const res = await fetch('/api/follow', { credentials: 'include'});

    if (res.ok) {
        const data = await res.json();
        dispatch(setFollows(data));
        return data;
    }
    return await res.json();
}

// REDUCER

const initialState = [];

export default function followsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FOLLOW:
            if (state.some(f => f.id === action.follow.id)) return state;
            return [...state, action.follow];
        case REMOVE_FOLLOW:
            return state.filter(f => f.id !== action.followId);
        case SET_FOLLOWS:
            return action.follows;
        default:
            return state;
    }
}
