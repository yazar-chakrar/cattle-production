/*jshint esversion: 8 */
const express = require('express');
// Routes
const cows = require('../routes/cows');
const births = require('../routes/births');
const consls = require('../routes/consultations');
const milkProd = require('../routes/productions');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/cows', cows);
  app.use('/api/births', births);
  app.use('/api/consls', consls);
  app.use('/api/milk-prod', milkProd);

}