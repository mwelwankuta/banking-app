import dotenv from 'dotenv';
import { SERVER_URI } from '../constants';
dotenv.config();

const accessToken = localStorage.getItem('token');

export async function Login(values) {
  console.log(JSON.stringify(values));
  return await fetch(SERVER_URI + '/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
}

export async function Register(values) {
  return await fetch(SERVER_URI + '/api/auth/register', {
    method: 'POST',
    body: values,
  }).then(res => res.json());
}

export async function User() {
  return await fetch(SERVER_URI + '/api/user', {
    headers: {
      authorization: accessToken,
    },
  }).then(res => res.json());
}
