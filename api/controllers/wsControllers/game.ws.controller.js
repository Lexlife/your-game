const wsServer = require('../../server');
const User = require('../../models/user.model');
const Game = require('../../models/game.model');
const Theme = require('../../models/theme.model');
const Question = require('../../models/question.model');

const checkAnswer = async (data) => {
  const { login, answer, theme, value } = JSON.parse(data);

  try {
    const question = await Question.findOne({ theme: theme, value: value }).select('answer');
    const isRight = (answer === question.answer);
    let game = {};
    if (isRight) game = await Game.findOneAndUpdate({ isFinished: false }, { $push: { answeredQuestions: `${theme + value}` } }, { new: true });
    return wsServer.clients.forEach((cl) => {
      cl.send(JSON.stringify({ login, isRight, answeredQuestions: game.answeredQuestions, type: 'gameStatus' }));
    });
  } catch (err) {
    console.log(err);
  }
};

const markAnswered = async (data) => {
  const { theme, value } = JSON.parse(data);

  try {
    const game = await Game.findOneAndUpdate({ isFinished: false }, { $push: { answeredQuestions: `${theme + value}` } }, { new: true });
    return wsServer.clients.forEach((cl) => {
      cl.send(JSON.stringify({ answeredQuestions: game.answeredQuestions, type: 'markedAnswered' }));
    });
  } catch (err) {
    console.log(err);
  }
};

const startGame = async (users) => {
  try {
    const themes = (await Theme.find()).map((el) => el.title);
    console.log(themes);
    const usersDocsArr = [];
    for (let userLogin of Object.keys(users)) {
      usersDocsArr.push({ user: (await User.findOne({ login: userLogin })).login });
    }

    const newGame = await Game.create({
      users: usersDocsArr,
      themes,
      answeredQuestions: [],
    });

    return wsServer.clients.forEach((cl) => {
      cl.send(JSON.stringify({ game: newGame, type: 'updateGame' }));
    });
  } catch (err) {
    console.log(err);
  }
};

const finishGame = async () => {
  try {
    const game = await Game.findOneAndUpdate({ isFinished: false }, { $set: { isFinished: true } }, { new: true });

    return wsServer.clients.forEach((cl) => {
      cl.send(JSON.stringify({ game, type: 'updateGame' }));
    });
  } catch (err) {
    console.log(err);
  }
};

const getQuestion = async (data) => {
  try {
    const { theme, value } = JSON.parse(data);
    const question = await Question.findOne({ theme: theme, value: value }).select('title question theme value');

    return wsServer.clients.forEach((cl) => {
      cl.send(JSON.stringify({ question, type: 'newQuestion' }));
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  checkAnswer,
  startGame,
  finishGame,
  getQuestion,
  markAnswered,
};
