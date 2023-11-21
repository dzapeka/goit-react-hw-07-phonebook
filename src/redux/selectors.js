import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contactsStore.contacts.items;
export const selectError = state => state.contactsStore.contacts.error;
export const selectIsLoading = state => state.contactsStore.contacts.isLoading;
export const selectFilter = state => state.contactsStore.filter;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
