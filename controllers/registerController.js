import bcrypt from 'bcryptjs';
import User from '../models/user.js';

export const registerGetController = async (req, res) => {
  res.status(200).render('register', {
    errors: '',
    name: '',
    email: '',
    password: '',
    password2: '',
  });
};

export const registerPostController = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.redirect('/register');
    return;
  }

  const errors = [];
  const regex = new RegExp('^[a-zA-Z0-9]{4,12}$');
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  const agreement = req.body.agreement;

  if (!regex.test(req.body.name) || !regex.test(req.body.password)) {
    errors.push('No symbols or spacing allowed');
  }
  if (name.length < 4 || name.length > 12) {
    errors.push('Username should be between 4 to 12 characters');
  }
  if (password.length < 4 || password.length > 12) {
    errors.push('Password should be between 4 to 12 characters');
  }
  if (password !== password2) {
    errors.push('Password and Confirmation Password do not match');
  }
  if (!agreement) {
    errors.push('Please check the agreement');
  }

  if (errors.length > 0) {
    res.render('register', { errors, name, email, password, password2 });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        name,
        email,
        password: hashedPassword,
        isAdmin: false,
      };
      const newUser = new User(user);
      await newUser.save();
      req.flash('success_msg', 'You have successfully registered!');
      res.redirect('/login');
    } catch (error) {
      console.log(error);

      if (error.code === 11000) {
        const value =
          Object.keys(error.keyValue)[0] === 'email' ? 'Email' : 'Username';
        errors.push(`${value} has already been taken`);
        res.render('register', { errors, name, email, password, password2 });
      }
    }
  }
};
