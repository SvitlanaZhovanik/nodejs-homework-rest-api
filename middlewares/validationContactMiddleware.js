const Joi = require("joi");
const { createError } = require("../helpers");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),
      phone: Joi.string()
        .pattern(/\+?[0-9\s\-/(/)]+/, "numbers")
        .required(),
      favorite: Joi.bool(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      throw createError(400, validationResult.error.details[0].message);
    }
    next();
  },
  updateFavoriteSchema: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.bool().required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      throw createError(400, validationResult.error.details[0].message);
    }
    next();
  },
};
