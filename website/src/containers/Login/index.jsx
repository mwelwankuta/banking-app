import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TextField from '../../ui/TextField';
import Container from '../../components/Container';

import { ROUTES } from '../../constants';

import { Login as SignIn } from '../../apis/authentication';
import { registerContext } from '../../context/register';
import { userContext } from '../../context/user';
import LoadingIndicator from '../../ui/LoadingIndicator';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setUser } = useContext(userContext);
  const { clear } = useContext(registerContext);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // api call
    try {
      const response = await SignIn({ email, password });
      setLoading(false);
      if (response.message) {
        setError(response.message);
        return;
      }
      setUser(response);
      localStorage.setItem('token', response.token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className='mx-4 mt-4 flex items-center justify-center h-screen'>
      <div className='w-full'>
        <h2 className='text-2xl mb-2 text-pink-800 text-center font-semibold'>
          Login
        </h2>
        <p className='text-gray-600'>
          login to pay bills, send {'&'} receive money.
        </p>
        <form className='mt-4' onSubmit={handleSubmit}>
          <TextField
            className='mb-4 '
            placeholder='Email'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <TextField
            placeholder='Password'
            type='password'
            className='mb-3'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <p className='text-red-500 mb-3'>{error}</p>
          <button
            type='submit'
            disabled={email.length === 0}
            style={{ opacity: email.length === 0 ? 0.5 : 1 }}
            className='bg-pink-800 text-white rounded-sm text-sm px-4 py-1 h-7 flex items-center justify-between'
          >
            {loading ? <LoadingIndicator color='white' /> : 'Login'}
          </button>
          <p className='mt-2'>
            does not have an account ?{' '}
            <span className='text-pink-700 font-medium'>
              <Link to={ROUTES.register}>register</Link>
            </span>
          </p>
        </form>
      </div>
    </Container>
  );
}

export default Login;
