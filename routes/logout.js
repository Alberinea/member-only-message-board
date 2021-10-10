import express from 'express';

const logoutRouter = express.Router();

logoutRouter.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success', 'You have successfully logged out')
  res.redirect('/');
});

export default logoutRouter;
