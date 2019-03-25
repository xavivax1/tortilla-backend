const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const cors = require('cors');

// const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');

const app = express();

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

mongoose.connect('mongodb://localhost/tortillApp', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  next();
});

// app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.use((req, res, next) => {
  res.status(404);
  res.json('not-found');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.json({ message: 'error', error: err });
  }
});

module.exports = app;
