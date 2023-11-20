import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contacts.reducer';
import styles from './ContactForm.module.css';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contactsStore.contacts);

  const handleSubmit = event => {
    event.preventDefault();

    const isExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExists) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact(name, number));
    setName('');
    setNumber('');
  };

  const handleChange = event => {
    const { name, value } = event.target;
    const stateFunctions = {
      name: setName,
      number: setNumber,
    };

    stateFunctions[name]?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      <label htmlFor={nameInputId}>
        <p className={styles.labelText}>Name</p>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          id={nameInputId}
          autoComplete="off"
          required
          pattern="^[a-zA-Zа-яА-ЯїіІ'Ї\s]+$"
        />
      </label>
      <label htmlFor={numberInputId}>
        <p className={styles.labelText}>Number</p>
        <input
          className="phoneNumberInput"
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          id={numberInputId}
          autoComplete="off"
          required
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
          placeholder="xxx-xx-xx"
          maxLength="9"
        />
      </label>
      <button type="submit" className={styles.addContactBtn}>
        Add contact
      </button>
    </form>
  );
};
