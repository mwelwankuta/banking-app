import React, { useContext } from 'react';

import Container from '../Container';
import Avatar from './Avatar';

import { userContext } from '../../context/user';
import { SERVER_URI } from '../../constants/apis.js';
import { useHistory } from "react-router-dom";

function Nav() {
  const { user, setUser } = useContext(userContext);

  const history = useHistory();

  const avatar = SERVER_URI + '/avatars/' + user.avatar;

  const handleLogout = async () => {
    localStorage.removeItem('token');
    setUser(null);
    history.push('/login')
  };

  return (
    <Container className='px-4 py-2 flex items-center justify-between bg-gray-50'>
      <Avatar avatar={avatar} />
      <p className='font-semibold text-lg text-gray-900'>Current Account</p>
      <button onClick={handleLogout} className='flex items-start'>
        <p className='text-sm mr-1 text-red-900'>Logout</p>
      </button>
    </Container>
  );
}

export default Nav;
