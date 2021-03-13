const userMiddleware = (req, res, next) => {
  if (req.session.user) res.locals.userlogin = req.session?.user?.login;
  next();
};

module.exports = userMiddleware;
