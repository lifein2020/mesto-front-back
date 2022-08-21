// Allowing access to certain sources
const allowedCors = [
  'http://localhost:3005/',
  'http://localhost:3005/sign-up',
  'http://localhost:3005/sign-in',
  'localhost: 3005',
  'http://localhost:3000/',
  'http://localhost:3000/sign-up',
  'http://localhost:3000/sign-in',
  'localhost: 3000',
  '*',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Save the origin of the request to the origin variable

  // Check that the request source is among the allowed ones
  if (allowedCors.includes(origin)) {
    res.header('Access-Conrol-Allow-Origin', origin); // origin
  }

  const { httpMethod } = req; // save the request type (HTTP method) to the corresponding variable
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,POST,PUT,PATCH,DELETE'; // default value for the Access-Control-Allow-Methods header (all request types are allowed)
  const requestHeaders = req.headers['access-control-request-headers']; // save the list of original request headers

  // If this is a preliminary request, add the necessary headers
  if (httpMethod === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS); // allow cross-domain requests of any type (default)
    res.header('Access-Control-Allow-Headers', requestHeaders); // allow cross-domain requests with these headers

    return res.end(); // finish processing the request and return the result to the client
  }
  next();
};
