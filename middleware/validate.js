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

module.exports = {
  validateBook,
  validateId
};