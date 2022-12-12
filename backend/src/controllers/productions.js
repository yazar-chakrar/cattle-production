/*jshint esversion: 8 */
const { validate } = require("../models/production");

const fs = require("fs");
const dataPath = "../database/milkprods.json";

exports.getMilkProds = (req, res) => {
  fs.readFile(dataPath, "utf8", (err, jsonString) => {
    if (err) res.status(500).send("File read failed:");

    try {
      const milkProds = JSON.parse(jsonString);
      res.send(milkProds);
    } catch (err) {
      res.status(500).send("Error parsing JSON string:");
    }
  });
};

exports.postMilkProd = (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  d = new Date(req.body.prodDate).setHours(0, 0, 0, 0);

  try {
    const jsonString = fs.readFileSync(dataPath);
    const milkProds = JSON.parse(jsonString);

    const existProdDay = milkProds.find((m) => m.prodDate === d);
    if (existProdDay)
      return res
        .status(400)
        .send("You Already put The Milk Quantity for this day");

    let milkProdInDb = {};

    milkProdInDb.prodDate = d;
    milkProdInDb.quantity = req.body.quantity;
    milkProdInDb._id = Date.now().toString();
    milkProds.push(milkProdInDb);

    fs.writeFile(dataPath, JSON.stringify(milkProds, null, 2), (err) => {
      if (err) res.status(500).send("Error writing file:");
    });

    res.send(milkProdInDb);
  } catch (err) {
    console.log(err);
    res.send("Somthing went wrong on the server");
  }
};

exports.updateMilkProd = (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  d = new Date(req.body.prodDate).setHours(0, 0, 0, 0);

  try {
    const jsonString = fs.readFileSync(dataPath);
    const milkProds = JSON.parse(jsonString);

    const milkProdInDb = milkProds.find((m) => m._id === req.params.id);
    if (!milkProdInDb) return res.status(400).send("Prod Not found.");

    milkProdInDb.prodDate = d;
    milkProdInDb.quantity = req.body.quantity;

    fs.writeFile(dataPath, JSON.stringify(milkProds, null, 2), (err) => {
      if (err) res.status(500).send("Error writing file:");
    });

    res.send(milkProdInDb);
  } catch (err) {
    console.log(err);
    res.send("Somthing went wrong on the server");
  }
};

exports.getMilkProd = (req, res) => {
  fs.readFile(dataPath, "utf8", (err, jsonString) => {
    if (err) res.status(500).send("File read failed:");

    try {
      const milkprods = JSON.parse(jsonString);
      const milkProd = milkprods.find((m) => m._id === req.params.id);
      if (!milkProd)
        res.status(404).send("No milkProd found with the given id");
      res.send(milkProd);
    } catch (err) {
      res.status(500).send("Error parsing JSON string:");
    }
  });
};

exports.deleteMilkProd = (req, res) => {
  try {
    const jsonString = fs.readFileSync(dataPath);
    const milkProds = JSON.parse(jsonString);

    let milkProdInDb = milkProds.find((m) => m._id === req.params.id);
    if (!milkProdInDb)
      res.status(404).send("No milkProd found with the given id");
    milkProds.splice(milkProds.indexOf(milkProdInDb), 1);

    fs.writeFile(dataPath, JSON.stringify(milkProds), (err) => {
      if (err) res.status(500).send("Error writing file:");
    });
    res.send(milkProdInDb);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error parsing JSON string:");
  }
};
