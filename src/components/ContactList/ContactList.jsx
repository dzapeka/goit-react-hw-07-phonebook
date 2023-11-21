import { ContactListItem } from 'components/ContactListItem';
import { useSelector } from 'react-redux';

import styles from './ContactList.module.css';
import { selectVisibleContacts } from 'redux/selectors';

export const ContactList = () => {
  const visibleContacts = useSelector(selectVisibleContacts);

  return (
    <ul className={styles.contactList}>
      {visibleContacts.map(contact => (
        <ContactListItem key={contact.id} {...contact} />
      ))}
    </ul>
  );
};
