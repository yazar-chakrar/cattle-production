/*jshint esversion: 8 */
const express = require("express");
const router = express.Router();
const {
  getConslts,
  postConslt,
  updateConslt,
  getConslt,
  deleteConslt,
} = require("../controllers/consultations");

// @desc Get all Consultations
// @route api/consults
// @access Public
router.get("/", (req, res) => getConslts(req, res));

// @desc Post Consultation
// @route api/consults
// @access Public
router.post("/", (req, res) => postConslt(req, res));

// @desc Update Consultation
// @route api/consults
// @access Public
router.put("/:id", (req, res) => updateConslt(req, res));

// @desc Get Consultation
// @route api/consults
// @access Public
router.get("/:id", (req, res) => getConslt(req, res));

// @desc Delete Consultation
// @route api/consults
// @access Public
router.delete("/:id", (req, res) => deleteConslt(req, res));

module.exports = router;
