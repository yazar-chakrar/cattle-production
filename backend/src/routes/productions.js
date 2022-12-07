/*jshint esversion: 8 */
const asyncMiddleware = require('../middleware/async');
const {MilkProd, validate} = require('../models/production');
const express = require('express');
const router = express.Router();

router.get('/', asyncMiddleware(async (req, res) => {
  const milkProd = await MilkProd.find().sort('prodDate');
  res.send(milkProd);
}));

router.post('/', asyncMiddleware(async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    d = new Date(req.body.prodDate).setHours(0,0,0,0)

    const existCow = await MilkProd.findOne({prodDate: d});
    if (existCow) return res.status(400).send('You Already put The Milk Quantity for this day');

    let milkProd = new MilkProd({
        prodDate: req.body.prodDate,
        quantity: req.body.quantity
    })

    res.send(await milkProd.save());
}));

router.get('/:id', asyncMiddleware(async(req, res) => {
    const milkProd = await MilkProd.findById(req.params.id);
    if (!milkProd) return res.status(404).send('The milkProd with given id wasn t found');
    res.send(milkProd);
}));
  
router.delete('/:id', async(req, res) => {
    const milkProd = await MilkProd.findByIdAndRemove(req.params.id);
    if (!milkProd) return res.status(404).send('The milkProd with given id wasn t found');
    res.send(milkProd);
});

module.exports = router;