import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ContactForm.module.css';
import { addContact } from 'redux/operations';
import { Notify } from 'notiflix';
import { selectContacts } from 'redux/selectors';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const nameInputId = nanoid();
  const phoneInputId = nanoid();

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = event => {
    event.preventDefault();

    const isExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExists) {
      Notify.info(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact({ name, phone }));
    setName('');
    setPhone('');
  };

  const handleChange = event => {
    const { name, value } = event.target;
    const stateFunctions = {
      name: setName,
      phone: setPhone,
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
      <label htmlFor={phoneInputId}>
        <p className={styles.labelText}>Phone</p>
        <input
          className="phoneNumberInput"
          type="tel"
          name="phone"
          value={phone}
          onChange={handleChange}
          id={phoneInputId}
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
