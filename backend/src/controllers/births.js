/*jshint esversion: 8 */
const { validate } = require("../models/birth");

const fs = require("fs");
const birthsDataPath = "../database/births.json";
const cowsDataPath = "../database/cows.json";

exports.getBirths = (req, res) => {
  fs.readFile(birthsDataPath, "utf8", (err, jsonString) => {
    if (err) res.status(500).send("File read failed:");

    try {
      const births = JSON.parse(jsonString);
      res.send(births);
    } catch (err) {
      res.status(500).send("Error parsing JSON string:");
    }
  });
};

exports.postBirth = (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const cowsJsonString = fs.readFileSync(cowsDataPath);
    const cows = JSON.parse(cowsJsonString);
    let motherCow = cows.find((m) => m.registerNumber === req.body.motherCowId);
    if (!motherCow) return res.status(400).send("Invalid motherCowId.");

    const birthsJsonString = fs.readFileSync(birthsDataPath);
    const births = JSON.parse(birthsJsonString);

    let birthInDb = {};
    birthInDb.bithDate = req.body.bithDate;
    birthInDb.motherCowId = req.body.motherCowId;
    birthInDb.motherBreed = motherCow.breed;
    birthInDb._id = Date.now().toString();
    births.push(birthInDb);

    fs.writeFile(birthsDataPath, JSON.stringify(births, null, 2), (err) => {
      if (err) res.status(500).send("Error writing file:");
    });

    res.send(birthInDb);
  } catch (err) {
    console.log(err);
    res.send("Somthing went wrong on the server");
  }
};

exports.updateBirth = (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const cowsJsonString = fs.readFileSync(cowsDataPath);
    const cows = JSON.parse(cowsJsonString);
    console.log(cows, req.body.motherCowId);
    let motherCow = cows.find((m) => m.registerNumber === req.body.motherCowId);
    console.log(motherCow);
    if (!motherCow) return res.status(400).send("Invalid motherCowId.");

    const birthsJsonString = fs.readFileSync(birthsDataPath);
    const births = JSON.parse(birthsJsonString);

    let birthInDb = births.find((m) => m._id === req.params.id);
    if (!birthInDb) res.status(404).send("Birth Not found.");
    birthInDb.bithDate = req.body.bithDate;
    birthInDb.motherCowId = req.body.motherCowId;
    birthInDb.motherBreed = motherCow.breed;

    fs.writeFile(birthsDataPath, JSON.stringify(births, null, 2), (err) => {
      if (err) res.status(500).send("Error writing file:");
    });

    res.send(birthInDb);
  } catch (err) {
    console.log(err);
    res.send("Somthing went wrong on the server");
  }
};

exports.getBirth = (req, res) => {
  fs.readFile(birthsDataPath, "utf8", (err, jsonString) => {
    if (err) res.status(500).send("File read failed:");

    try {
      const births = JSON.parse(jsonString);
      const birth = births.find((m) => m._id === req.params.id);
      if (birth) {
        res.send(birth);
      } else {
        res.status(404).send("No birth found with the given id");
      }
    } catch (err) {
      res.status(500).send("Error parsing JSON string:");
    }
  });
};

exports.deleteBirth = (req, res) => {
  try {
    const jsonString = fs.readFileSync(birthsDataPath);
    const births = JSON.parse(jsonString);

    let birthInDb = births.find((m) => m._id === req.params.id);
    if (!birthInDb) res.status(404).send("No birth found with the given id");
    births.splice(births.indexOf(birthInDb), 1);

    fs.writeFile(birthsDataPath, JSON.stringify(births), (err) => {
      if (err) res.status(500).send("Error writing file:");
    });
    res.send(birthInDb);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error parsing JSON string:");
  }
};
