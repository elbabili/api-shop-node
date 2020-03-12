const sql = require("./db.js");

// constructor
const Customer = function(customer) {
    this.name = customer.name;
    this.address = customer.address;
    this.phone = customer.phone;
    this.email = customer.email;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO T_Customers SET name=? , address=? , email=? , phone=?", 
            [newCustomer.name, newCustomer.address, newCustomer.email, newCustomer.phone])
            .then(res => {
                console.log("created customer: ", { id: res.insertId, ...newCustomer });
                //result(null, { id: res.insertId, ...newCustomer });
                result(null,res.insertId);
  })
  .catch(err => {
      console.log("error: ", err);
      result(err, null);
   })
}

module.exports = Customer;

//ToDO : Routes & CRUD for Customers
