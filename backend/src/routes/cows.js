/*jshint esversion: 8 */
const asyncMiddleware = require('../middleware/async');
const {Cow, validate} = require('../models/cow');
const express = require('express');
const router = express.Router();

// @desc Get All Cows
// @route api/cows
// @access Public
router.get('/', asyncMiddleware(async (req, res) => {
  const cows = await Cow.find().sort('dateIn');
  res.send(cows);
}));

// @desc Post Cow
// @route api/cows
// @access Public
router.post('/', asyncMiddleware(async(req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const existCow = await Cow.findOne({registerNumber: req.body.registerNumber});
    if (existCow) return res.status(400).send('Invalid registerNumber, Already used');
  
    let cow = new Cow({ 
        registerNumber: req.body.registerNumber,
        dateIn: req.body.dateIn,
        breed: req.body.breed,
    });
    cow = await cow.save();
    res.send(cow);
}));

// @desc Update Cow
// @route api/cows
// @access Public
router.put('/:id', asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const cow = await Cow.findByIdAndUpdate(
      req.params.id,
      {
          registerNumber: req.body.registerNumber,
          dateIn: req.body.dateIn,
          breed: req.body.breed,
      },
      {
          new: true
      }
  );

  if (!cow) return res.status(404).send('The cow with the given ID was not found.');

  res.send(cow);
}));

// @desc get One Cow
// @route api/cows
// @access Public
router.get('/:id', asyncMiddleware(async(req, res) => {
  const cow = await Cow.findById(req.params.id);
  if (!cow) return res.status(404).send('The Cow with given id wasn t found');
  res.send(cow);
}));

// @desc Delete one Cow
// @route api/cows
// @access Public
router.delete('/:id', asyncMiddleware(async(req, res) => {
  const cow = await Cow.findByIdAndRemove(req.params.id);
  if (!cow) return res.status(404).send('The Cow with given id wasn t found');
  res.send(cow);
}));

module.exports = router;