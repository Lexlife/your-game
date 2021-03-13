const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');

const sessionStore = require('./dbConnect');

const userMiddleware = require('./middlewares/user.middleware');

const indexRouter = require('./routes/index.router');
const authRouter = require('./routes/auth.router');

const app = express();

const corsOptions = {
  // origin: /\.your.domain\.com$/,    // reqexp will match all prefixes
  origin: '*',
  methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
  credentials: true,                // required to pass
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 2,
    },
  }),
);

app.use(userMiddleware);

app.use('/', indexRouter);
app.use('/auth', authRouter);

module.exports = app;
