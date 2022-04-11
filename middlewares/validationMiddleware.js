const Joi = require("joi");

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
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "missing fields",
        status: validationResult.error.details[0].message,
      });
    }
    next();
  },
};
