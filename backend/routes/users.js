const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const validator = require('validator');
// avatar link validation
const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

const {
  getUsers,
  getUserProfile,
  updateUser,
  updateAvatar,
  getUserMe,
} = require('../controllers/users');

// returns information about the current user
router.get('/users/me', getUserMe);

//  returns all users
router.get('/users', getUsers);

// returns user by _id
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserProfile);

// updates the profile
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser); //   :userId

// updates the avatar
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(method), // Joi.string().required().pattern(URL_REGEX)
  }),
}), updateAvatar); //  :userId

module.exports = router;
