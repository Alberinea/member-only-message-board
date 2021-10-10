import passport from 'passport';

export const loginGetController = async (req, res) => {
  res.status(200).render('login', {});
};

export const loginPostController = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
};
