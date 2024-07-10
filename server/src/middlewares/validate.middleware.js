const ApiError = require("../utils/ApiError");
const pick = require("../utils/pick");
const Joi = require("joi");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["body", "params", "query"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(",");
     next(new ApiError(400, errorMessage));
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
