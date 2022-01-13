import { SERVER_URI } from '../constants';

export async function HomeTransactions() {
  return await fetch(SERVER_URI + '/api/home', {
    headers: {
      authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
}
