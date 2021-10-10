import local from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const LocalStrategy = local.Strategy;

const strategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ name: username });
    if (!user) {
      return done(null, false, { message: 'Username incorrect' });
    }

    bcrypt.compare(password, user.password, (error, isMatch) => {
      if (error) throw error;

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

const initPassport = (passport) => {
  passport.use(strategy);
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

export default initPassport;
