const { Pizza } = require('../models');

//ALL ENDPOINT ROUTES

const pizzaController = {
  // methods used as callback functions for express
  getAllPizza(req,res) { //callback for GET/api/pizzas
    Pizza.find({}) //.find() is mongoose
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err)
      })
  },
  //get one pizza by id
  getPizzaById({ params }, res) { //destructured params out of it, because that's the only data we need
    Pizza.findOne({ _id: params.id })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' })
        return;
      }
      res.json(dbPizzaData)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },
  //create pizza
  createPizza({ body }, res) { //post/api/pizza
    Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.status(400).json(err));
  },
  // update pizza by id
  updatePizza({ params, body }, res) { //PUT /api/pizzas/:id         //Mongoose finds a single document we want to update, then updates it and returns the updated document
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true }) //By setting the parameter to true, we're instructing Mongoose to return the new version of the document. 
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },
  //delete pizza
  deletePizza({ params }, res) { //DELETE /api/pizzas/:id
    Pizza.findOneAndDelete({ _id: params.id }) //.findOneAndDelete() method will find the document to be returned and also delete it from the database
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = pizzaController;