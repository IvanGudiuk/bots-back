const { RequestError } = require("../helpers/RequestError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (req.body.bots) {
      req.body.bots = JSON.parse(req.body.bots);
    }

    const { error } = schema.validate(req.body);
    if (error && Object.keys(req.body).length > 0) {
      next(RequestError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
