export const SERVER_URI =
  process.env.NODE_ENV === 'production'
    ? 'https://shouts-server.herokuapp.com'
    : 'http://localhost:8080';
