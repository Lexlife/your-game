const wsServer = require('./server');

const {
  signIn,
  signOut,
} = require('./controllers/wsControllers/auth.ws.controller');

const {
  checkAnswer,
  startGame,
  finishGame,
  getQuestion,
  markAnswered,
} = require('./controllers/wsControllers/game.ws.controller');

const users = {};

wsServer.on('connection', (client) => {
  console.log('>>>> client connected. clients: ', wsServer.clients.size);

  console.log('connection', users);
  wsServer.clients.forEach((cl) => {
    cl.send(JSON.stringify({ users: Object.values(users), type: 'users list' }));
  });

  client.on('message', (data) => {
    const { type } = JSON.parse(data);
    switch (type) {
      case 'signout':
        return signOut(users, data);

      case 'signin': {
        return signIn(users, data);
      }

      case 'userAnswer': {
        return checkAnswer(data);
      }

      case 'startGame': {
        return startGame(users);
      }

      case 'finishGame': {
        return finishGame();
      }

      case 'getQuestion': {
        return getQuestion(data);
      }

      case 'markAnswered': {
        return markAnswered(data);
      }

      default:
        return wsServer.clients.forEach((cl) => {
          cl.send(data);
        });
    }
  });

  client.on('close', (cl) => {
    console.log('>>>> client disconnected. clients: ', wsServer.clients.size);
  });
});
