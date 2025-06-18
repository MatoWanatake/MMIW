// src/redux/store.js

import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import storiesReducer from "./stories";
import commentsReducer from "./comments";
import followsReducer from "./follows";
import tagsReducer from "./tags";


const rootReducer = combineReducers({
  session: sessionReducer,
  stories: storiesReducer,
  comments: commentsReducer,
  follows: followsReducer,
  tags: tagsReducer,

});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) =>
  createStore(rootReducer, preloadedState, enhancer);

export default configureStore;
