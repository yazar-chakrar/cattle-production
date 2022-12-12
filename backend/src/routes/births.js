/*jshint esversion: 8 */
const express = require("express");
const router = express.Router();
const {
  getBirth,
  getBirths,
  postBirth,
  updateBirth,
  deleteBirth,
} = require("../controllers/births");

// @desc Get All Births
// @route api/cows
// @access Public
router.get("/", (req, res) => getBirths(req, res));

// @desc Add & Update Birth
// @route api/cows
// @access Public
router.post("/", (req, res) => postBirth(req, res));

// @desc Update Birth
// @route api/cows
// @access Public
router.put("/:id", (req, res) => updateBirth(req, res));

// @desc Get one Birth
// @route api/cows
// @access Public
router.get("/:id", (req, res) => getBirth(req, res));

// @desc Delete Birth
// @route api/cows
// @access Public
router.delete("/:id", (req, res) => deleteBirth(req, res));

module.exports = router;
