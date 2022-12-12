const Joi = require("joi");

function validateGenre(conslt) {
  const schema = Joi.object({
    consltDate: Joi.date().required(),
    disease: Joi.string().required(),
  });

  return schema.validate(conslt);
}

exports.validate = validateGenre;
