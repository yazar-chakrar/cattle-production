const Joi = require("joi")
const mongoose = require("mongoose")

const milkProdSchema = new mongoose.Schema({
    prodDate:{
        type: Date,
        default: new Date().setHours(0,0,0,0),
        unique : true
    },
    quantity:{
        type: Number, 
        required: true,
        min: 0
    },
});

const MilkProd = new mongoose.model("MilkProd", milkProdSchema);

function validateGenre(milkProd) {
    const schema = Joi.object({
        prodDate: Joi.date().required(),
        quantity: Joi.number().min(0).required(),
    });

    return schema.validate(milkProd);
}

exports.MilkProd = MilkProd;
exports.validate = validateGenre;