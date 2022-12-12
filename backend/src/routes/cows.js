/*jshint esversion: 8 */
const express = require("express");
const router = express.Router();
const {
  getCow,
  getCows,
  postCow,
  updateCow,
  deleteCow,
} = require("../controllers/cows");

// @desc Get All Cows
// @route api/cows
// @access Public
router.get("/", (req, res) => getCows(req, res));

// @desc Add & Update Cow
// @route api/cows
// @access Public
router.post("/", (req, res) => postCow(req, res));

// @desc Update Cow
// @route api/cows
// @access Public
router.put("/:id", (req, res) => updateCow(req, res));

// @desc get One Cow
// @route api/cows
// @access Public
router.get("/:id", (req, res) => getCow(req, res));

// @desc Delete one Cow
// @route api/cows
// @access Public
router.delete("/:id", (req, res) => deleteCow(req, res));

module.exports = router;
