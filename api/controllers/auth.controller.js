const bcrypt = require('bcrypt');
const User = require('../models/user.model');

function failAuth(res, message) {
  console.log('file-auth.js message:', Date.now(), message);
  return res.status(401).json({ session: false, message });
};

function serializeUser(user) {
  return {
    id: user.id,
    login: user.login,
  };
};

const signUp = async (req, res) => {
  const { login, password } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      login,
      password: hashedPassword,
    });

    req.session.user = serializeUser(user);
  } catch (err) {
    console.error('Err message:', err.message);
    console.error('Err code', err.code);
    return failAuth(res, { login: 'Пользователь с таким логином уже зарегистрирован' });
  }

  return res.json({ session: true, login, message: 'signUp successfully' });
};

const signIn = async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await User.findOne({ login: login }).exec();

    if (!user) return failAuth(res, { login: 'Пользователь с таким логином не зарегистрирован' });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return failAuth(res, { password: 'Неверный пароль' });

    req.session.user = serializeUser(user);
  } catch (err) {
    console.error('Err message:', err.message);
    console.error('Err code', err.code);
    return failAuth(res, err.message);
  }

  return res.json({ session: true, login, message: 'login successfully' }); // ответ браузеру + cookies
};

const signOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('sid');
    return res.json({ session: false, message: 'logout successfully' });
  });
};

module.exports = {
  signUp,
  signIn,
  signOut,
};
