const validator = require('../helpers/validate');

const validateBook = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    author: 'required|string',
    ranking: 'required|numeric',
    genre: 'required|string',
    wordCount: 'required|numeric',
    year: 'required|numeric',
    series: 'required|string', 
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const validateId = (req, res, next) => {
  const validationRule = {
    id: 'required|alpha_num|size:24'
  }
  validator(req.params, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
}

const validateShow = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    director: 'required|string',
    ranking: 'required|numeric',
    genre: 'required|string',
    episodes: 'required|numeric',
    year: 'required|numeric',
    seasons: 'required|numeric', 
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  validateBook,
  validateId,
  validateShow
};


// Unused Code to check for a currently logged in user.

// const { requiresAuth } = require('express-openid-connect');

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });