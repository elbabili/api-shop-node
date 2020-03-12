const sql = require("./db.js");

// constructor
const Product = function(product) {
  //this.id = product.id;
  this.name = product.name;
  this.brand = product.brand;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO T_Products SET name = ?, brand = ?", [newProduct.name, newProduct.brand]).then(res => {
         console.log("created product: ", { id: res.insertId, ...newProduct });
         result(null, { id: res.insertId, ...newProduct });
  })
  .catch(err => {
      console.log("error: ", err);
      result(err, null);
   })
}

Product.findById = (productId, result) => {
  sql.query(`SELECT * FROM T_Products WHERE id = ${productId}`).then(res => {
        if (res.length) {
              //console.log("found product: ", res[0]);
              result(null, res[0]);
              return;
        }
        // not found Product with the id
        result({ kind: "not_found" }, null);
        console.log("product not found there");
  })
  .catch(err => {
      console.log("error: ", err);
      result(err, null);
   })
}

Product.getAll = result => {
  sql.query("SELECT * FROM T_Products").then(rows => {
            result(null,rows);
       })
       .catch(err => {
            console.log("error: ", err);
            result(null, err);
       })
}

Product.updateById = (id, product, result) => {
  sql.query("UPDATE T_Products SET name = ?, brand = ? WHERE id = ?",[product.name, product.brand, id]).then(res => {
          if(res.affectedRows == 0) {
                // not found Product with the id
                result({ kind: "not_found" }, null);
                return;
          }
          console.log("updated T_Products: ", { id: id, ...product });
          result(null, { id: id, ...product });
      })
      .catch(err => {
            console.log("error: ", err);
            result(null, err);
      })
}

Product.remove = (id, result) => {
  sql.query("DELETE FROM T_Products WHERE id = ?", id).then(res => {
        if (res.affectedRows == 0) {
              // not found Product with the id
              result({ kind: "not_found" }, null);
              return;
        }
        console.log("deleted T_Products with id: ", id);
        result(null, res);
  })
  .catch(err => {
        console.log("deleted T_Products with id: ", id);
        result(null, res);
  })
}

Product.removeAll = result => {
  sql.query("DELETE FROM T_Products").then(res => {
       console.log(`deleted ${res.affectedRows} products`);
       result(null, res);
  })
  .catch(err => {
      console.log("error: ", err);
      result(null, err);
   })
}

module.exports = Product;
