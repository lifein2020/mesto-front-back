// import model
const Card = require('../models/card');

// return all cards
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch((err) => {
      next(err);
    });
};

// create a card
module.exports.createCard = (req, res, next) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;
  return Card.create({ name, link, owner: ownerId }) // create a document based on the received data
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const badRequest = new Error('Incorrect data has been sent');
        badRequest.statusCode = 400;
        next(badRequest);
      }
      next(err);
    });
};

// delete card by id
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const notFound = new Error('Resource not found');
      notFound.statusCode = 404;
      throw notFound;
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id.toString()) {
        const NotAuthError = new Error("Attempt to delete someone else's card");
        NotAuthError.statusCode = 403;
        throw NotAuthError;
      }
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        next(err);
      }
      if (err.statusCode === 403) {
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

// like the card
module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    { _id: cardId },
    { $addToSet: { likes: req.user._id } }, // add _id to array if it's not there
    { new: true },
  )
    .orFail(() => {
      const err = new Error('Resource not found');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => {
      res.status(200).send({ card });
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

//  remove like from card
module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // remove _id from array
    { new: true },
  )
    .orFail(() => {
      const err = new Error('Resource not found');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => {
      res.status(200).send({ card });
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
