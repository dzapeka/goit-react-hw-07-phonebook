export const getContacts = state => state.contactsStore.contacts.items;
export const getError = state => state.contactsStore.contacts.error;
export const getLoaderStatus = state => state.contactsStore.contacts.isLoading;
export const getFilter = state => state.contactsStore.filter;
