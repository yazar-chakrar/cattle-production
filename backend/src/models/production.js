const Joi = require("joi");

function validateGenre(milkProd) {
  const schema = Joi.object({
    prodDate: Joi.date().required(),
    quantity: Joi.number().min(0).required(),
  });

  return schema.validate(milkProd);
}

exports.validate = validateGenre;
