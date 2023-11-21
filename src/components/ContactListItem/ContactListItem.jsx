import { useDispatch } from 'react-redux';
import styles from './ContectListItem.module.css';
import { deleteContact } from 'redux/contacts/contacts.reducer';

export const ContactListItem = ({ id, name, phone }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={styles.contactListItem}>
      {name}: {phone}
      <button
        className={styles.deleteContactBtn}
        onClick={handleDeleteContact}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};
