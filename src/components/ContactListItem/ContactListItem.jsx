import { useDispatch } from 'react-redux';
import styles from './ContectListItem.module.css';
import { deleteContact } from 'redux/contacts/contacts.reducer';

export const ContactListItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={styles.contactListItem}>
      {name}: {number}
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
