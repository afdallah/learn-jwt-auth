const jwt = require('jsonwebtoken');

async function isAuthenticated (req, res, next) {
  const [ bearerPrefix, token ] = req.headers.authorization.split(' ');

  if (!req.headers.authorization) return res.status(400).send('Access denied. No token provided!')
  if (bearerPrefix !== 'Bearer') return res.status(400).send('Wrong authorization header');

  try {
    const encoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = encoded
    next();
  } catch(err) {
    res.status(400).send({
      errors: err
    })
  }
}

module.exports = isAuthenticated;