const Joi = require('joi');
const mongoose = require('mongoose');

const cowSchema = new mongoose.Schema({
    registerNumber:{
      type: Number,
      required: true,
      unique : true,
      min : 100000000,
      max : 999999999,
    },
    dateIn:{
        type: Date,
        default: Date.now,
    },
    breed:{
        type: String,
        enum: ['Montbeliard', 'Holstein'],
        default: 'Montbeliard'
    }
})
const Cow = mongoose.model('Cows', cowSchema);

function validateGenre(cow) {
    const schema = Joi.object({
        registerNumber: Joi.number().min(100000000).max(999999999).required(),
        dateIn: Joi.date(),
        breed: Joi.string().required()
    });

    return schema.validate(cow);
}

exports.Cow = Cow;
exports.validate = validateGenre;