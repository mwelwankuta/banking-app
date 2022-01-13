import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ROUTES } from '../../../constants';
import { registerContext } from '../../../context/register';
import { Register } from '../../../apis/authentication';

import Container from '../../../components/Container';
import TextField from '../../../ui/TextField';

const formData = new FormData();

function Avatar() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState('');
  const { firstname, lastname, password, email, image, setImage } =
    useContext(registerContext);

  const history = useHistory();

  useEffect(() => {
    if (image) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [image]);

  const handleSubmit = async () => {
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('file', image);

    if (!image) {
      alert('alerting for now, all fields are required');
      return;
    }
    setLoading(true);

    // api call
    try {
      const response = await Register(formData);
      console.log(response);
    } catch (error) {
      setError(error.message);
    }
    history.push(ROUTES.login);
    setLoading(false);
  };

  return (
    <Container className='mx-4 mt-4'>
      <h2 className='text-xl font-semibold'>Add an Image</h2>
      <p className='text-gray-600'>
        add an avatars to let others recognize you easily
      </p>
      <Container className='mt-4'>
        <TextField
          type='file'
          onChange={e => {
            setImage(e.target.files[0]);
          }}
          accept='image/jpeg,image/png'
          className='mb-2 '
          placeholder='First Name'
        />
        <button
          onClick={handleSubmit}
          className='bg-pink-700 text-white w-full rounded-sm px-4 py-1 mt-2'
        >
          {loading ? 'Loading...' : 'Register'}
        </button>
        <p className='my-2 text-red-500'>{error}</p>
        <p className='mt-2'>
          already have have an account ?{' '}
          <span className='text-pink-700 font-medium'>
            <Link to={ROUTES.login}>login</Link>
          </span>
        </p>
      </Container>
    </Container>
  );
}

export default Avatar;
