/*jshint esversion: 8 */
const { validate } = require("../models/consultation");

const fs = require("fs");
const dataPath = "../database/conslts.json";

// @desc Get all Consultations
// @route api/consults
// @access Public
exports.getConslts = (req, res) => {
  fs.readFile(dataPath, "utf8", (err, jsonString) => {
    if (err) res.status(500).send("File read failed:");

    try {
      const conslts = JSON.parse(jsonString);
      res.send(conslts);
    } catch (err) {
      res.status(500).send("Error parsing JSON string:");
    }
  });
};

// @desc Post Consultation
// @route api/consults
// @access Public
exports.postConslt = (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const jsonString = fs.readFileSync(dataPath);
    const conslts = JSON.parse(jsonString);
    let consltInDb = {};

    consltInDb.consltDate = req.body.consltDate;
    consltInDb.disease = req.body.disease;
    consltInDb._id = Date.now().toString();
    conslts.push(consltInDb);

    fs.writeFile(dataPath, JSON.stringify(conslts, null, 2), (err) => {
      if (err) res.status(500).send("Error writing file:");
    });

    res.send(consltInDb);
  } catch (err) {
    console.log(err);
    res.send("Somthing went wrong on the server");
  }
};

// @desc Update Consultation
// @route api/consults
// @access Public
exports.updateConslt = (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const jsonString = fs.readFileSync(dataPath);
    const conslts = JSON.parse(jsonString);
    let consltInDb = conslts.find((m) => m._id === req.params.id);
    if (!consltInDb) res.status(404).send("Consultation Not found.");

    consltInDb.consltDate = req.body.consltDate;
    consltInDb.disease = req.body.disease;

    fs.writeFile(dataPath, JSON.stringify(conslts, null, 2), (err) => {
      if (err) res.status(500).send("Error writing file:");
    });

    res.send(consltInDb);
  } catch (err) {
    console.log(err);
    res.status(500).send("Somthing went wrong on the server");
  }
};

// @desc Get Consultation
// @route api/consults
// @access Public
exports.getConslt = (req, res) => {
  fs.readFile(dataPath, "utf8", (err, jsonString) => {
    if (err) res.status(500).send("File read failed:");

    try {
      const conslts = JSON.parse(jsonString);
      const conslt = conslts.find((m) => m._id === req.params.id);
      if (!conslt) res.status(404).send("No conslt found with the given id");
      res.send(conslt);
    } catch (err) {
      res.status(500).send("Error parsing JSON string:");
    }
  });
};

// @desc Delete Consultation
// @route api/consults
// @access Public
exports.deleteConslt = (req, res) => {
  try {
    const jsonString = fs.readFileSync(dataPath);
    const conslts = JSON.parse(jsonString);

    let consltInDb = conslts.find((m) => m._id === req.params.id);
    if (!consltInDb)
      res.status(404).send("No consultation found with the given id");
    conslts.splice(conslts.indexOf(consltInDb), 1);

    fs.writeFile(dataPath, JSON.stringify(conslts), (err) => {
      if (err) res.status(500).send("Error writing file:");
    });
    res.send(consltInDb);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error parsing JSON string:");
  }
};
