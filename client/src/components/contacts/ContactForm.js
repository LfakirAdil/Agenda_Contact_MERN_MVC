import React, { useState, useEffect } from 'react';
import {
  addContact,
  useContacts,
  updateContact,
  clearCurrent
} from '../../context/contact/ContactState';

const initialContact = {
  name: '',
  email: '',
  phone: '',
  type: 'personal'
};

const ContactForm = () => {
  const [contactState, contactDispatch] = useContacts();

  const { current } = contactState;

  const [contact, setContact] = useState(initialContact);

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(initialContact);
    }
  }, [current]);

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contactDispatch, contact).then(() =>
        setContact(initialContact)
      );
    } else {
      updateContact(contactDispatch, contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent(contactDispatch);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Modifier contact' : 'Ajouter contact'}
      </h2>
      <input
        type='text'
        placeholder='Nom'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='E-mail'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Téléphonne'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Type</h5>
      <input
        type='radio'
        name='type'
        value='personel'
        checked={type === 'personel'}
        onChange={onChange}
      />{' '}
      Personel{' '}
      <input
        type='radio'
        name='type'
        value='professionel'
        checked={type === 'professionel'}
        onChange={onChange}
      />{' '}
      Professionel
      <div>
        <input
          type='submit'
          value={current ? 'Mis à jour au contact' : 'Ajouter contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Effacer les champs
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
