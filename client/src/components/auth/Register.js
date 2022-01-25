import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import { useAuth, clearErrors, register } from '../../context/auth/AuthState';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  const { setAlert } = alertContext;

  useEffect(() => {
    if (error === 'Utilisateur exist déjà') {
      setAlert(error, 'danger');
      clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, props.history, setAlert, authDispatch]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Completer tout les champs svp', 'danger');
    } else if (password !== password2) {
      setAlert('Erreur confirmation mot de passe', 'danger');
    } else {
      register(authDispatch, {
        name,
        email,
        password
      });
    }
  };

  if (isAuthenticated) return <Navigate to='/' />;

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>S'enregistrer</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Nom</label>
          <input
            id='name'
            type='text'
            name='nom'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>E-mail</label>
          <input
            id='email'
            type='email'
            name='e-mail'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Mot de passe</label>
          <input
            id='password'
            type='password'
            name='mot de passe'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirmer mot de passe</label>
          <input
            id='password2'
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Enregistrer'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
