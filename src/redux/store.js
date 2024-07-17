// import { createStore } from 'redux';
// import { devToolsEnhancer } from '@redux-devtools/extension';
import { combineReducers } from 'redux';
import { contactsReducer, filterReducer } from './reducers';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

// const initialState = {};

// const enhancer = devToolsEnhancer();

// export const store = createStore(rootReducer, enhancer);

// configureStore sets up the enhancer under the hood
// so that we don't need to manually import the devtools enhancer function
//to use the Redux Dev Tools

export const store = configureStore({
  reducer: rootReducer,
});
