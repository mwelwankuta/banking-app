import { SERVER_URI } from '../constants';

const accessToken = localStorage.getItem('token');

export async function Send(values) {
  return await fetch(SERVER_URI + '/api/transaction/send', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      authorization: accessToken,
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
}
