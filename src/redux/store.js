// import { createStore } from 'redux';
// import { devToolsEnhancer } from '@redux-devtools/extension';
import { combineReducers } from 'redux';
import { contactsReducer, filterReducer } from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Combine your reducers
const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

// Create the persist config object
const persistConfig = {
  key: 'root',
  storage,
  // You can specify which parts of your state you want to persist here
  whitelist: ['contacts'], // In your case, you probably only want to persist contacts
};

// Wrap your rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const initialState = {};

// const enhancer = devToolsEnhancer();

// export const store = createStore(rootReducer, enhancer);

// configureStore sets up the enhancer under the hood
// so that we don't need to manually import the devtools enhancer function
//to use the Redux Dev Tools

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
