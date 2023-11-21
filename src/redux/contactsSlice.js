import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from 'redux/operations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter(state, { payload }) {
      state.filter = payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== payload.id
        );
      })
      .addCase(fetchContacts.pending, state => {
        state.contacts.isLoading = true;
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending
        ),
        state => {
          state.contacts.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected
        ),
        (state, { payload }) => {
          state.contacts.isLoading = false;
          state.contacts.error = payload;
        }
      ),
});
export const { setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
