const Joi = require('joi');
const mongoose = require('mongoose');

const consltSchema = new mongoose.Schema({
    consltDate:{
        type: Date,
        default: Date.now,
    },
    disease:{
        type: String, 
        required: true,
    },
})
const Conslt = mongoose.model('Conslts', consltSchema);

function validateGenre(conslt) {
    const schema = Joi.object({
        consltDate: Joi.date().required(),
        disease: Joi.string().required(),
    });

    return schema.validate(conslt);
}

exports.Conslt = Conslt;
exports.validate = validateGenre;