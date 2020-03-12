const Categorie = require("../models/categorie.model.js");

// Create and Save a new Categorie
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
      res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Categorie
  const categorie = new Categorie({
    name: req.body.name,
    description: req.body.description
  });

  // Save Categorie in the database
  Categorie.create(categorie, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the categorie."
      });
    else res.send(data);
  });
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
  Categorie.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving catégories."
      });
    else res.send(data);
  });
};

// Retrieve all products of one category from database
exports.productsbycat = (req, res) => {
  Categorie.findProductsByCat(req.params.categorieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Categorie with id ${req.params.categorieId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Categorie with id " + req.params.categorieId
        });
      }
    } else { 
      res.send(data);
      console.log(data);
    }
  });

}

// Find a single Categorie with a categorieId
exports.findOne = (req, res) => {
  Categorie.findById(req.params.categorieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Categorie with id ${req.params.categorieId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Categorie with id " + req.params.categorieId
        });
      }
    } else res.send(data);
  });
};

// Update a Categorie identified by the categorieId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Categorie.updateById(
    req.params.categorieId,
    new Categorie(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Categorie with id ${req.params.categorieId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Product with id " + req.params.categorieId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Categorie with the specified categorieId in the request
exports.delete = (req, res) => {
  Categorie.remove(req.params.categorieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Categorie with id ${req.params.categorieId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Categorie with id " + req.params.categorieId
        });
      }
    } else res.send({ message: `Categorie was deleted successfully!` });
  });
};

// Delete all categories from the database.
exports.deleteAll = (req, res) => {
  Categorie.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categories."
      });
    else res.send({ message: `All categories were deleted successfully!` });
  });
};
