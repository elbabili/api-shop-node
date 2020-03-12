const Customer = require("../models/customer.model.js");
const Order = require("../models/order.model.js");

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
      res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const customer = new Customer({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email
  });

  // Save Customer in the database
  Customer.create(customer, (err, data) => {
    if (err)    
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the customer."
    });  
    else {
        // Create an Order 
        const order = new Order({
          total: req.body.total,
          cart: req.body.cart,
          idcust: data 
        });    
        // Save Order in the database
        Order.create(order, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the order"
            });
          else {
              // Return the order created
              Order.findById(data.insertId, (err, data) => {
                if (err)
                  res.status(500).send({
                    message:
                      err.message || "Some error occurred while finding the order"
                  });
                else {
                  res.send(data);
                }
              });
          }
        });
    }
  });
};
