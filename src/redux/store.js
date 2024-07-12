import { createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';
import { combineReducers } from 'redux';
import { contactsReducer, filterReducer } from './reducers';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

// const initialState = {};

const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, enhancer);
