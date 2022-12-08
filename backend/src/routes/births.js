/*jshint esversion: 8 */
const asyncMiddleware = require('../middleware/async');
const {Birth, validate} = require('../models/birth');
const {Cow} = require('../models/cow');

const express = require('express');
const router = express.Router();

router.get('/', asyncMiddleware(async (req, res) => {
  const births = await Birth.find().sort('birthDate');
  res.send(births);
}));

router.post('/', asyncMiddleware(async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const motherCow = await Cow.findOne({registerNumber: req.body.motherCowId});
    if (!motherCow) return res.status(400).send('Invalid motherCowId.');

    let birth = new Birth({
        birthDate: req.body.birthDate,
        motherCow: motherCow.registerNumber,
        breed: motherCow.breed
    })

    res.send(await birth.save());
}));

router.put('/:id', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const motherCow = await Cow.findOne({registerNumber: req.body.motherCowId});
    if (!motherCow) return res.status(400).send('Invalid motherCowId.');

    const birth = await Birth.findByIdAndUpdate(
        req.params.id,
        {
            birthDate: req.body.birthDate,
            motherCow: motherCow.registerNumber,
            breed: motherCow.breed
        },
        {
            new: true
        }
    );
  
    if (!birth) return res.status(404).send('The birth with the given ID was not found.');
  
    res.send(birth);
}));

router.get('/:id', asyncMiddleware(async(req, res) => {
    const birth = await Birth.findById(req.params.id);
    if (!birth) return res.status(404).send('The Cow with given id wasn t found');
    res.send(birth);
}));
  
router.delete('/:id', asyncMiddleware(async(req, res) => {
    const birth = await Birth.findByIdAndRemove(req.params.id);
    if (!birth) return res.status(404).send('The Cow with given id wasn t found');
    res.send(birth);
}));

module.exports = router;