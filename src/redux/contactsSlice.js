import { createSlice } from '@reduxjs/toolkit';

const initialContactsState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

// the create slice function accepts only one object parameter
// this object parameter includes the combination of the action and reducer declaration
// has three required properties that we have to supply in the parameter object

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,

  // we passed the reducer property in the parameter object
  // the reducer object has two properties inside of it which are the action generations

  reducers: {
    // for each action type, we will declare a reducer and/OR the prepare function
    // reducer function is responsible for modifying the actual state
    // prepare function is responsible for describing the action payload
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare({ name, number }) {
        return { payload: { id: nanoid(), name, number } };
      },
    },
    deleteContact: {
      reducer(state, action) {
        const index = state.findIndex(contact => contact.id === action.payload);
        if (index !== -1) {
          state.splice(index, 1);
        }
      },
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
