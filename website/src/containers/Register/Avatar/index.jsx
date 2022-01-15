import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/solid';

import { ROUTES } from '../../../constants';
import { registerContext } from '../../../context/register';
import { Register } from '../../../apis/authentication';

import Container from '../../../components/Container';
import TextField from '../../../ui/TextField';
import LoadingIndicator from '../../../ui/LoadingIndicator';

const formData = new FormData();

function Avatar() {
  const [loading, setLoading] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const { firstname, lastname, password, email, image, setImage, setStep } =
    useContext(registerContext);

  const history = useHistory();

  useEffect(() => {
    if (image.name.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [image]);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);

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
      setMessage(error.message);
    }
    setSubmitting(false);
    history.push(ROUTES.login);
    setLoading(false);
  };

  return (
    <Container className='mx-4 mt-4 flex items-center justify-center h-screen'>
      <div className='w-full'>
        <button
          onClick={() => setStep(0)}
          className='flex items-center text-gray-600'
        >
          <ArrowLeftIcon className='h-6' />
          <span className='ml-2'>back</span>
        </button>
        <h2 className='text-xl font-semibold text-center text-pink-800 mb-3'>
          Add an Image
        </h2>
        <p className='text-gray-600'>
          add an avatars to let others recognize you easily
        </p>
        <form className='mt-4' onSubmit={handleSubmit}>
          <label htmlFor='file' className=''>
            <p
              className={`px-4 py-1 bg-gray-100 rounded-sm truncate mb-4 ${
                image ? 'text-pink-700' : ''
              }`}
            >
              {image ? 'Selected' : 'Choose'} Avatar{' '}
              <span className='text-gray-500'>{image.name}</span>
            </p>
            <TextField
              type='file'
              id='file'
              onChange={e => {
                setImage(e.target.files[0]);
              }}
              accept='image/jpeg,image/png'
              className='mb-2 hidden'
              placeholder='First Name'
            />
          </label>
          <button
            onClick={handleSubmit}
            className='bg-pink-700 text-white text-sm w-full rounded-sm px-4 py-1 mt-2 h-8 flex items-center justify-center'
            style={{ opacity: loading ? 0.5 : 1 }}
            disabled={loading}
          >
            {submitting ? <LoadingIndicator color='white' /> : 'Register'}
          </button>
          <p className='my-2 text-yellow-500'>{message}</p>
          <p className='mt-2'>
            already have have an account ?{' '}
            <span className='text-pink-700 font-medium'>
              <Link to={ROUTES.login}>login</Link>
            </span>
          </p>
        </form>
      </div>
    </Container>
  );
}

export default Avatar;
