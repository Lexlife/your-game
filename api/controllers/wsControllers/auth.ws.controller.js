const wsServer = require('../../server');

const signIn = (users, data) => {
  const { login } = JSON.parse(data);
  users[login] = { login, score: 0 };

  console.log(users);
  return wsServer.clients.forEach((cl) => {
    cl.send(JSON.stringify({ users: Object.values(users), type: 'users list' }));
  });
};

const signOut = (users, data) => {
  const { login } = JSON.parse(data);
  delete users[login];

  console.log(users);
  return wsServer.clients.forEach((cl) => {
    cl.send(JSON.stringify({ users: Object.values(users), type: 'users list' }));
  });
};

module.exports = {
  signIn,
  signOut,
};
