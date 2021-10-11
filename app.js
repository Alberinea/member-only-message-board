import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import mongoose from 'mongoose';
import indexRouter from './routes/index.js';
import registerRouter from './routes/register.js';
import loginRouter from './routes/login.js';
import logoutRouter from './routes/logout.js';
import initPassport from './Utils/passport.js';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'express-flash';
import sanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

const app = express();
const port = process.env.PORT || 3000;

initPassport(passport);
dotenv.config();

const clientPromise = mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.4gvsm.mongodb.net/${process.env.COLLECTION}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((db) => db.connection.getClient())
  .then(console.log('connected to the database'))
  .catch((err) => {
    console.log(err);
  });

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(logger('dev'));

//sanitization
app.use(sanitize());
app.use(xss());

// Session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      clientPromise,
      dbName: process.env.COLLECTION,
      touchAfter: 24 * 3600,
      ttl: 14 * 24 * 3600,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Vars
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.user = req.user;
  next();
});

//Routers
app.use(indexRouter, registerRouter, loginRouter, logoutRouter);

// 404
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(port, console.log(`listening on port ${port}`));
