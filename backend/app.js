// Connect an express
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

// Set the port that the application should listen on
const { PORT = 3005 } = process.env;

// Create an application
const app = express();

const validator = require('validator');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const {
  createUser,
  login,
} = require('./controllers/users');

const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

// Link validation
const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

const auth = require('./middlewares/auth');

// Connect to mongo server. Database name is mestodb.
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => { console.log('Connected to MongoDb!'); })
  .catch((err) => {
    console.log('No connection. Error:', err);
  });

// Parser for processing the request body in PUT
app.use(express.json());

// Attaching CORS security policy
app.use(cors());
/* app.use(cors({
  origin: 'http://localhost:3005/',
  optionsSuccessStatus: 200,
})); */

// Connect the request logger as a middleware to all route handlers:
app.use(requestLogger);

// Server crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('The server is about to crash');
  }, 0);
});

// Route for registration
app.post('/sign-up', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(method),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

// Route for authentication
app.post('/sign-in', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

// Protection by authorization of all routes with the lines below
app.use(auth);

// Connect routes
app.use('/', userRouter); //  localhost:PORT/ + userRouter
app.use('/', cardRouter); //  localhost:PORT/ + cardRouter

// We connect the error logger after the route handlers and before the error handlers
app.use(errorLogger);

// Routing error
app.use((req, res, next) => {
  const notFound = new Error('Resources not found');
  notFound.statusCode = 404;
  next(notFound);
});

// Error handler - celebrate
app.use(errors());

// Here we handle all errors centrally
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || `Server side error, ${err}`;
  res.status(statusCode).send(message);

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
