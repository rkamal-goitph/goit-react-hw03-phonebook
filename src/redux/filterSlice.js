import { createSlice } from '@reduxjs/toolkit';

const initialFilterState = '';

// createSlice({name, initialState, reducers})

// reducers = { actionGenerator1, actionGenerator2 }

// actionGenerator = { reducerFunction, prepareFunction }

// reducerFunction - alter or modify or update the state -- SETSTATE

// prepareFunction - describes the change that will be applied to the existing state

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
  reducers: {
    setFilter: {
      reducer(_state, action) {
        return action.payload;
      },
    },
  },
});
