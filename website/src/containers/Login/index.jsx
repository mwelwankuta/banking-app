import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import TextField from '../../ui/TextField';
import Container from '../../components/Container';

import { ROUTES } from '../../constants';

import { Login as SignIn } from '../../apis/authentication';
import { userContext } from '../../context/user';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(userContext);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email || !password) {
      alert('alerting for now, will replace with custom alert...');
      return;
    }
    setLoading(true);

    // api call
    try {
      const response = await SignIn({email, password});
      setLoading(false);
      if (response.message === 'user does not exist') {
        alert(response.message);
        return;
      }
      setUser(response);
      localStorage.setItem('token', response.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className='mx-4 mt-4'>
      <h2 className='text-xl font-semibold'>Login</h2>
      <p className='text-gray-600'>
        login to pay bills, send and receive money.
      </p>
      <form className='mt-4' onSubmit={handleSubmit}>
        <TextField
          className='mb-2'
          placeholder='Email'
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <TextField
          placeholder='Password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button className='bg-pink-700 text-white w-full rounded-sm px-4 py-1 mt-2'>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <p className='mt-2'>
          does not have an account ?{' '}
          <span className='text-pink-700 font-medium'>
            <Link to={ROUTES.register}>register</Link>
          </span>
        </p>
      </form>
    </Container>
  );
}

export default Login;
