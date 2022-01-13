import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../constants';

import Container from '../../../components/Container';
import TextField from '../../../ui/TextField';
import { registerContext } from '../../../context/register';

function Form() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    firstname,
    lastname,
    email,
    password,
    setFirstname,
    setLastname,
    setEmail,
    setPassword,
    setStep,
  } = useContext(registerContext);

  const nextStep = () => {
    if (!firstname || !lastname || !email || !password) {
      setError('all fields are required');
      return;
    }
    setStep(1);
  };

  useEffect(() => {
    if (firstname && lastname && email && password) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [email, firstname, lastname, password, setLoading]);

  return (
    <Container className='mx-4 mt-4'>
      <h2 className='text-xl font-semibold'>Create Account</h2>
      <p className='text-gray-600'>
        login to pay bills, send and receive money.
      </p>
      <Container className='mt-4'>
        <TextField
          className='mb-2'
          placeholder='First Name'
          value={firstname}
          onChange={({ target }) => {
            setFirstname(target.value);
          }}
        />
        <TextField
          className='mb-2'
          placeholder='Last Name'
          value={lastname}
          onChange={({ target }) => {
            setLastname(target.value);
          }}
        />
        <TextField
          className='mb-2'
          placeholder='Email'
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
        />
        <TextField
          placeholder='Password'
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
        <p className='text-red-600 my-2'>{error}</p>
        <button
          onClick={nextStep}
          className='bg-pink-700 text-white w-full rounded-sm px-4 py-1 mt-2'
          style={{ opacity: loading ? 0.5 : 1 }}
          disabled={loading}
        >
          Next
        </button>
      </Container>
      <p className='mt-2'>
        already have an account ?{' '}
        <span className='text-pink-700 font-medium'>
          <Link to={ROUTES.login}>login</Link>
        </span>
      </p>
    </Container>
  );
}

export default Form;
