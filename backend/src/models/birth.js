const Joi = require('joi');
const mongoose = require('mongoose');

const birthSchema = new mongoose.Schema({
    birthDate:{
        type: Date,
        default: Date.now,
    },
    motherCow:{
        type: Number, 
        required: true,
        min : 100000000,
        max : 999999999,
    },
    breed:{
        type: String,
        enum: ['Montbeliard', 'Holstein'],
        default: 'Montbeliard'
    },
})
const Birth = mongoose.model('Births', birthSchema);

function validateGenre(birth) {
    const schema = Joi.object({
        bithDate: Joi.date().required(),
        motherCowId: Joi.number().min(100000000).max(999999999).required(),
    });

    return schema.validate(birth);
}

exports.Birth = Birth;
exports.validate = validateGenre;