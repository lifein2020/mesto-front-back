const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const url = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minLength: 2, // the minimum name length is 2 characters
    maxLength: 30, // and the maximum is 30 characters
    default: 'Jacques-Yves Cousteau',
  },
  about: {
    type: String,
    required: false,
    minLength: 2,
    maxLength: 30,
    default: 'Ocean explorer',
  },
  avatar: {
    type: String,
    required: false,
    default: url,
    validate: {
      validator: function validateAvatar(v) {
        const avatarUrl = /http(s)?:\/\/(www.)?[\w\-.]*\.\w{1,}\/?[\w\-._~:/?#[\]@!$&'()*+,;=]*#?/g;
        return avatarUrl.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Wrong email format',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // to prevent the API from returning the password hash
  },
});

// Email and password verification code is part of the User schema
// used in the login controller
userSchema.statics.findUserByCredentials = function authenticateUser(email, password) {
  // try to find a user by email
  return this.findOne({ email }).select('+password') // this — is the User model
    .then((user) => {
      if (!user) {
        const loginError = new Error('Wrong email and password'); // 'Неправильная почта'
        loginError.statusCode = 401;
        loginError.name = 'LoginError'; // see name in terminal
        loginError.code = 11000;
        throw loginError;
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            const loginError = new Error('Wrong email and password');
            loginError.statusCode = 401;
            loginError.name = 'LoginError';
            loginError.code = 11000;
            throw loginError;
          }
          return user; // now user is available
        });
    });
};

module.exports = mongoose.model('user', userSchema);
