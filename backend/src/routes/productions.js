/*jshint esversion: 8 */
const express = require("express");
const router = express.Router();
const {
  getMilkProds,
  postMilkProd,
  updateMilkProd,
  getMilkProd,
  deleteMilkProd,
} = require("../controllers/productions");

// @desc Get all Milk Productions
// @route api/production
// @access Public
router.get("/", (req, res) => getMilkProds(req, res));

// @desc Post day Milk Productions
// @route api/production
// @access Public
router.post("/", (req, res) => postMilkProd(req, res));

// @desc Update day Milk Productions
// @route api/production
// @access Public
router.put("/:id", (req, res) => updateMilkProd(req, res));

// @desc get one day Milk Productions
// @route api/production
// @access Public
router.get("/:id", (req, res) => getMilkProd(req, res));

// @desc Delete day Milk Productions
// @route api/production
// @access Public
router.delete("/:id", (req, res) => deleteMilkProd(req, res));

module.exports = router;
