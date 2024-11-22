const { RequestError } = require("../helpers/RequestError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (req.body.appliances) {
      req.body.appliances = JSON.parse(req.body.appliances);
    }

    if (req.body.facilities) {
      req.body.facilities = JSON.parse(req.body.facilities);
    }

    if (req.body.fromOwner) {
      req.body.fromOwner = JSON.parse(req.body.fromOwner);
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
