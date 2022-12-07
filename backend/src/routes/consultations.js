/*jshint esversion: 8 */
const asyncMiddleware = require('../middleware/async');
const {Conslt, validate} = require('../models/consultation');
const express = require('express');
const router = express.Router();

router.get('/', asyncMiddleware(async (req, res) => {
  const conslts = await Conslt.find().sort('consltDate');
  //throw new Error('SUML SERV ERR');
  res.send(conslts);
}));

router.post('/', asyncMiddleware(async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let conslt = new Conslt({
        consltDate: req.body.consltDate,
        disease: req.body.disease
    })

    res.send(await conslt.save());
}));

router.get('/:id', asyncMiddleware(async(req, res) => {
    const conslt = await Conslt.findById(req.params.id);
    if (!conslt) return res.status(404).send('The Conslt with given id wasn t found');
    res.send(conslt);
}));
  
router.delete('/:id', asyncMiddleware(async(req, res) => {
    const conslt = await Conslt.findByIdAndRemove(req.params.id);
    if (!conslt) return res.status(404).send('The Conslt with given id wasn t found');
    res.send(conslt);
}));

module.exports = router;