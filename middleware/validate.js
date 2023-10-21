const validator = require('../helpers/validate');

const validateBook = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    author: 'required|string',
    ranking: 'required|numeric',
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
  validateBook
};