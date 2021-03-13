const mongoose = require('mongoose');
const connectMongo = require('connect-mongo');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(process.env.DB_PATH, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongoose connected to %s database', process.env.DB_PATH);
  })
  .catch((err) => {
    console.log('Database connection error', err.message);
  });

const MongoStore = connectMongo(session);

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.createConnection(process.env.SESSION_DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }),
});

module.exports = sessionStore;
