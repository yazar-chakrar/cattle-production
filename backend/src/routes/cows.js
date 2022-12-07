/*jshint esversion: 8 */
const asyncMiddleware = require('../middleware/async');
const {Cow, validate} = require('../models/cow');
const express = require('express');
const router = express.Router();

router.get('/', asyncMiddleware(async (req, res) => {
  const cows = await Cow.find().sort('dateIn');
  res.send(cows);
}));

router.post('/', asyncMiddleware(async(req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const existCow = await Cow.findOne({registerNumber: req.body.registerNumber});
    if (existCow) return res.status(400).send('Invalid registerNumber, Already used');
  
    let cow = new Cow({ 
        registerNumber: req.body.registerNumber,
        breed: req.body.breed,
    });
    cow = await cow.save();
    res.send(cow);
}));

router.get('/:id', asyncMiddleware(async(req, res) => {
  const cow = await Cow.findById(req.params.id);
  if (!cow) return res.status(404).send('The Cow with given id wasn t found');
  res.send(cow);
}));

router.delete('/:id', asyncMiddleware(async(req, res) => {
  const cow = await Cow.findByIdAndRemove(req.params.id);
  if (!cow) return res.status(404).send('The Cow with given id wasn t found');
  res.send(cow);
}));

module.exports = router;