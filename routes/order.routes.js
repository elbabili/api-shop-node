//Les routes sollicitent le controller ici qui 
module.exports = app => {
    const order = require("../controllers/order.controller.js");
  
    // Create an order
    app.post("/order", order.create);

    // ToDo : the others...
};