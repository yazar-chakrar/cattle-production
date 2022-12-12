const Joi = require("joi");

function validateGenre(cow) {
  const schema = Joi.object({
    registerNumber: Joi.number().min(100000000).max(999999999).required(),
    dateIn: Joi.date(),
    breedId: Joi.string().required(),
  });

  return schema.validate(cow);
}

exports.validate = validateGenre;
