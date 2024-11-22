const RequestError = require("../helpers/RequestError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    try {
      // Ensure bots is always an array
      if (req.body.bots && typeof req.body.bots === "string") {
        req.body.bots = JSON.parse(req.body.bots);
      }

      const { error } = schema.validate(req.body);
      if (error) {
        return next(RequestError(400, error.message));
      }
      next();
    } catch (err) {
      return next(RequestError(400, "Invalid bots format. Must be JSON."));
    }
  };
  return func;
};

module.exports = validateBody;
