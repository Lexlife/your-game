const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    res.json({ session: false, message: 'not authorize' });
  } else next();
};

module.exports = authMiddleware;
