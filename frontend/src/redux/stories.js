// action types
const LOAD_STORIES = 'stories/LOAD_STORIES';
const LOAD_STORY = 'stories/LOAD_STORY';
const ADD_STORY = 'stories/ADD_STORY';
const UPDATE_STORY = 'stories/UPDATE_STORY';
const REMOVE_STORY = 'stories/REMOVE_STORY';

// action creators
const loadStories = stories => ({ type: LOAD_STORIES, stories });
const loadStory = story => ({ type: LOAD_STORY, story });
const addStory = story => ({ type: ADD_STORY, story });
const updateStoryAC = story => ({ type: UPDATE_STORY, story });
const removeStory = id => ({ type: REMOVE_STORY, storyId: id});

// THUNKS

//fetch story list
export const fetchStories = () => async dispatch => {
    const res = await fetch('/api/stories', { credentials: 'include' });
    if (res.ok) {
        const data = await res.json();
        dispatch(loadStories(data));
    }
};

//fetch one story
export const fetchStory = id => async dispatch => {
    const res = await fetch(`/api/stories/${id}`, { credentials: 'include' });
    if (res.ok) {
        const data = await res.json();
        dispatch(loadStory(data));
    }
};

// create story
export const createStory = storyData => async dispatch => {
    const res = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(storyData)
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(addStory(data));
        return data;
    }
    return await res.json();
};

// update story
export const updateStory = (id, storyData) => async dispatch => {
    const res = await fetch(`/api/stories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(storyData)
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(updateStoryAC(data));
        return data;
    }
    return await res.json();
};

// delete story
export const deleteStory = id => async dispatch => {
    const res = await fetch(`/api/stories/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    if (res.ok) {
        dispatch(removeStory(id));
        return true;
    }
    return false;
};

// REDUCER

const initialState = {
    all: [],
    current: null,
};

export default function storiesReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_STORIES:
            return { ...state, all: action.stories };
        case LOAD_STORY:
            return { ...state, current: action.story };
        case ADD_STORY:
            return {...state, all: [...state.all, action.story] };
        case UPDATE_STORY:
            return {
                ...state,
                all: state.all.map(s => s.id === action.story.id ? action.story :s),
                current: action.story
            };
        case REMOVE_STORY:
            return {
                ...state,
                all: state.all.filter(s => s.id !== action.storyId),
                current: state.current?.id === action.storyId ? null : state.current
            };
        default:
            return state;
    }
}

export const selectAllStories = state => state.stories.all;
export const selectCurrentStory = state => state.stories.current;
