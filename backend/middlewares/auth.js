const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = () => {
  const loginError = new Error('Authorization required');
  loginError.statusCode = 401;
  throw loginError;
};

module.exports = (req, res, next) => {
  // get authorization header
  const { authorization } = req.headers;

  // make sure it exists or starts with Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }
  // if the token is in place, extract it
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? JWT_SECRET : 'prod-secret');
  } catch (err) {
    return handleAuthError(err);
  }

  req.user = payload; // write the payload to the request object

  next(); // skip the request futher
};
