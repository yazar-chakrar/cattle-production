const Joi = require("joi");

function validateGenre(birth) {
  const schema = Joi.object({
    bithDate: Joi.date().required(),
    motherCowId: Joi.number().min(100000000).max(999999999).required(),
  });

  return schema.validate(birth);
}

exports.validate = validateGenre;
