/*jshint esversion: 8 */
const { validate } = require("../models/cow");

const fs = require("fs");
const dataPath = "../database/cows.json";
const breedsPath = "../database/breeds.json";

exports.getCows = (req, res) => {
  fs.readFile(dataPath, "utf8", (err, jsonString) => {
    if (err) res.status(500).send("File read failed:");
    try {
      const cows = JSON.parse(jsonString);
      res.send(cows);
    } catch (err) {
      res.status(500).send("Error parsing JSON string:");
    }
  });
};

exports.postCow = (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const jsonString = fs.readFileSync(dataPath);
    const cows = JSON.parse(jsonString);
    let cowInDb = cows.find(
      (m) => m.registerNumber === req.body.registerNumber
    );
    if (cowInDb) res.status(400).send("The regNumber already exist.");

    const breedJsonString = fs.readFileSync(breedsPath);
    const breeds = JSON.parse(breedJsonString);
    let breedInDb = breeds.find((m) => m._id === req.body.breedId);
    if (!breedInDb) res.status(400).send("Breed Not defined.");

    cowInDb = {};
    cowInDb.registerNumber = req.body.registerNumber;
    cowInDb.breed = breedInDb.name;
    cowInDb.dateIn = req.body.dateIn;
    cowInDb._id = Date.now().toString();
    cows.push(cowInDb);
    fs.writeFile(dataPath, JSON.stringify(cows, null, 2), (err) => {
      if (err) res.status(500).send("Error writing file:");
    });
    res.send(cowInDb);
  } catch (err) {
    console.log(err);
    res.send("Somthing went wrong on the server");
  }
};

exports.updateCow = (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const jsonString = fs.readFileSync(dataPath);
    const cows = JSON.parse(jsonString);
    let cowInDb = cows.find((m) => m._id === req.params.id);
    if (!cowInDb) res.status(404).send("Cow Not found.");

    const breedJsonString = fs.readFileSync(breedsPath);
    const breeds = JSON.parse(breedJsonString);
    let breedInDb = breeds.find((m) => m._id === req.body.breedId);
    if (!breedInDb) res.status(400).send("Breed Not defined.");

    cowInDb.registerNumber = req.body.registerNumber;
    cowInDb.breed = breedInDb.name;
    cowInDb.dateIn = req.body.dateIn;

    fs.writeFile(dataPath, JSON.stringify(cows, null, 2), (err) => {
      if (err) res.status(500).send("Error writing file:");
    });

    res.send(cowInDb);
  } catch (err) {
    console.log(err);
    res.send("Somthing went wrong on the server");
  }
};

exports.getCow = (req, res) => {
  fs.readFile(dataPath, "utf8", (err, jsonString) => {
    if (err) {
      res.status(500).send("File read failed:");
    } else {
      try {
        const cows = JSON.parse(jsonString);
        const cow = cows.find((m) => m._id === req.params.id);
        if (!cow) res.status(404).send("No cow found with the given id");
        res.send(cow);
      } catch (err) {
        res.status(500).send("Error parsing JSON string:");
      }
    }
  });
};

exports.deleteCow = (req, res) => {
  try {
    const jsonString = fs.readFileSync(dataPath);
    const cows = JSON.parse(jsonString);

    let cowInDb = cows.find((m) => m._id === req.params.id);
    if (!cowInDb) res.status(404).send("No cow found with the given id");
    cows.splice(cows.indexOf(cowInDb), 1);

    fs.writeFile(dataPath, JSON.stringify(cows, null, 2), (err) => {
      if (err) res.status(500).send("Error writing file:");
    });
    res.send(cowInDb);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error parsing JSON string:");
  }
};
