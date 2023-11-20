import { ContactListItem } from 'components/ContactListItem';
import styles from './ContactList.module.css';
import { useSelector } from 'react-redux';

export const ContactList = () => {
  const contacts = useSelector(state => state.contactsStore.contacts);
  const filter = useSelector(state => state.contactsStore.filter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={styles.contactList}>
      {filteredContacts.map(contact => (
        <ContactListItem key={contact.id} {...contact} />
      ))}
    </ul>
  );
};
