const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

//  Creating documents

// return information about the current user
const getUserMe = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

// return all users
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch((err) => {
      next(err);
    });
};

//  return user by _id
const getUserProfile = (req, res, next) => {
  const { userId } = req.params;
  return User.findById(userId) // (req.params.userId)
    .orFail(() => {
      const err = new Error('Resource not found');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        next(err);
      }
      if (err.name === 'CastError') {
        const badRequest = new Error('Incorrect data has been sent');
        badRequest.statusCode = 400;
        next(badRequest);
      }
      next(err);
    });
};

// create a user
const createUser = (req, res, next) => {
  User.findOne(({ email: req.body.email }))
    .then((user) => {
      if (user) {
        const MongoServerError = new Error('User with this email already exists');
        MongoServerError.statusCode = 409;
        MongoServerError.code = 11000;
        MongoServerError.name = 'MongoServerError';
        throw MongoServerError;
      }
      return bcrypt.hash(req.body.password, 10); // hash the password, 10 is the salt
    })
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash, // write the hash to the database
    }))
    .then(({
      name,
      about,
      avatar,
      email,
      _id,
    }) => {
      res.status(201).send({
        data: {
          name,
          about,
          avatar,
          email,
          _id,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const badRequest = new Error('Incorrect data has been sent');
        badRequest.statusCode = 400;
        next(badRequest);
      }
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(err);
      }
      next(err);
    });
};

// updates the profile
const updateUser = (req, res, next) => {
  const { name, about } = req.body; // get user name and description from the request object
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    // pass an options object to pass in then an already updated record
    {
      new: true, // the then handler will receive an updated record as input
      runValidators: true, // data will be validated before change
    },
  )
    .orFail(() => {
      const err = new Error('Resource not found');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        next(err);
      }
      if (err.name === 'ValidationError') {
        const badRequest = new Error('Incorrect data has been sent');
        badRequest.statusCode = 400;
        next(badRequest);
      }
      next(err);
    });
};

//  updates the avatar
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      const err = new Error('Resource not found');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        next(err);
      }
      if (err.name === 'ValidationError') {
        const badRequest = new Error('Incorrect data has been sent');
        badRequest.statusCode = 400;
        next(badRequest);
      }
      next(err);
    });
};

// authentication
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // authentication is successful! user in user variable
      // create a token
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV !== 'production' ? JWT_SECRET : 'prod-secret',
        { expiresIn: '7d' },
      );
      // return the token in the response body
      return res.status(200).send({ token });
    })
    .catch((err) => {
      // the error comes from findUserByCredentials. See models - user.js - method
      if (err.name === 'LoginError' && err.code === 11000) {
        next(err);
      }
      next(err);
    });
};

module.exports = {
  getUsers,
  getUserProfile,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getUserMe,
};
