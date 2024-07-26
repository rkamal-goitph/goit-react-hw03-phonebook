import axios from 'axios';
import {
  fetchingContactsError,
  fetchingContactsInProgress,
  fetchingContactsSuccess,
} from './contactsSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://661f381416358961cd93cd73.mockapi.io/api';

// the operations.js is where we dispatch the action generators corresponding for each phase of the async promise
// export const fetchContacts = () => async dispatch => {
//   try {
//     // Load indicator
//     dispatch(fetchingContactsInProgress());
//     // HTTP request
//     const response = await axios.get('/contacts');
//     // Data processing
//     dispatch(fetchingContactsSuccess(response.data));
//   } catch (e) {
//     // Error processing
//     dispatch(fetchingContactsError(e.message));
//   }
// };

// Higher Order Function or Nested Function
// fetchContacts () => async () => ()

// SYNTAX
// createAsyncThunk(actionTypeString, asyncOperationFunction);

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      // HTTP request
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding a contact
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkAPI) => {
    try {
      // POST requests require a request body in the form of an object // this is the contactData
      const response = await axios.post('/contacts', contactData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject the promise with the error message
    }
  }
);

// Async thunk for deleting a contact
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      // DELETE requests do not require a request body, only a paramId in the form of a string which corresponds to the item to be deleted
      await axios.delete(`/contacts/${contactId}`);
      return contactId; // Return the id to identify which contact was deleted
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject the promise with the error message
    }
  }
);
