import { Notify } from 'notiflix';
import { ContactListItem } from 'components/ContactListItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contacts/contacts.reducer';
import Loader from 'components/Loader/Loader';
import styles from './ContactList.module.css';

export const ContactList = () => {
  const contacts = useSelector(state => state.contactsStore.contacts.items);
  const filter = useSelector(state => state.contactsStore.filter);
  const error = useSelector(state => state.contactsStore.contacts.error);

  const isLoading = useSelector(
    state => state.contactsStore.contacts.isLoading
  );

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={styles.contactList}>
          {filteredContacts.map(contact => (
            <ContactListItem key={contact.id} {...contact} />
          ))}
        </ul>
      )}
    </>
  );
};
