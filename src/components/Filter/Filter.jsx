import { nanoid } from 'nanoid';
import styles from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/contacts/contacts.reducer';

export const Filter = () => {
  const filterInputId = nanoid();
  const dispatch = useDispatch();

  const handleChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <label htmlFor={filterInputId}>
      <p className={styles.labelText}>Find contacts by name</p>
      <input
        type="text"
        name="filter"
        onChange={handleChange}
        id={filterInputId}
        autoComplete="off"
        required
      />
    </label>
  );
};
