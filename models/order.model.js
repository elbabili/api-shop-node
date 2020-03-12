const sql = require("./db.js");

// constructor
const Order = function(order) {
    this.total = order.total;
    this.cart = order.cart;     // ToDO : ajouter une table order_item : id/price/quantity/order_id/product_id
    this.idcust = order.idcust;
};

//create one order
Order.create = (newOrder, result) => {
  sql.query("INSERT INTO T_Orders SET total=? , idCust=?",[newOrder.total, newOrder.idcust])
            .then(res => {
                console.log("created order: ", { id: res.insertId, ...newOrder });
                result(null,res);
  })
  .catch(err => {
      console.log("error: ", err);
      result(err, null);
   })
}

Order.findById = (orderId, result) => {
    sql.query(`SELECT * FROM T_Orders WHERE id = ${orderId}`).then(res => {
          if (res.length) {
                result(null, res[0]);
                return;
          }
          // not found Order with the id
          result({ kind: "not_found" }, null);
          console.log("order not found there");
    })
    .catch(err => {
        console.log("error: ", err);
        result(err, null);
     })
  }

module.exports = Order;
