import { Notify } from 'notiflix';
import { ContactListItem } from 'components/ContactListItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loader from 'components/Loader/Loader';
import styles from './ContactList.module.css';
import {
  getContacts,
  getError,
  getFilter,
  getLoaderStatus,
} from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const error = useSelector(getError);
  const isLoading = useSelector(getLoaderStatus);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Notify.failure(error);
    }
  }, [error]);

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
