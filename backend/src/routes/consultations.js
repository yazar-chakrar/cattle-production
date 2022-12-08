/*jshint esversion: 8 */
const asyncMiddleware = require('../middleware/async');
const {Conslt, validate} = require('../models/consultation');
const express = require('express');
const router = express.Router();

// @desc Get all Consultations
// @route api/consults
// @access Public
router.get('/', asyncMiddleware(async (req, res) => {
  const conslts = await Conslt.find().sort('consltDate');
  //throw new Error('SUML SERV ERR');
  res.send(conslts);
}));

// @desc Get one Consultation
// @route api/consults
// @access Public
router.post('/', asyncMiddleware(async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let conslt = new Conslt({
        consltDate: req.body.consltDate,
        disease: req.body.disease
    })

    res.send(await conslt.save());
}));

// @desc Update Consultation
// @route api/consults
// @access Public
router.put('/:id', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const conslt = await Conslt.findByIdAndUpdate(
        req.params.id,
        {
            consltDate: req.body.consltDate,
            disease: req.body.disease
        },
        {
            new: true
        }
    );
  
    if (!conslt) return res.status(404).send('The conslt with the given ID was not found.');
  
    res.send(conslt);
}));

// @desc Get Consultation
// @route api/consults
// @access Public
router.get('/:id', asyncMiddleware(async(req, res) => {
    const conslt = await Conslt.findById(req.params.id);
    if (!conslt) return res.status(404).send('The Conslt with given id wasn t found');
    res.send(conslt);
}));

// @desc Delete Consultation
// @route api/consults
// @access Public
router.delete('/:id', asyncMiddleware(async(req, res) => {
    const conslt = await Conslt.findByIdAndRemove(req.params.id);
    if (!conslt) return res.status(404).send('The Conslt with given id wasn t found');
    res.send(conslt);
}));

module.exports = router;