const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // recuperer token de l'header
  const token = req.header('x-auth-token');

  // verification sur le token
  if (!token) {
    return res.status(401).json({ msg: 'Pas de token' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token est invalid' });
  }
};
