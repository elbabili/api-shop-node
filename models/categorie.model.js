const sql = require("./db.js");

// constructor
const Categorie = function(categorie) {
  this.id = categorie.id;
  this.name = categorie.name;
  this.description = categorie.brand;
};

Categorie.create = (newCategorie, result) => {
  sql.query("INSERT INTO T_Categories SET name = ?, brand = ?", [newCategorie.name, newCategorie.description]).then(res => {
         console.log("created categorie: ", { id: res.insertId, ...newCategorie });
         result(null, { id: res.insertId, ...newCategorie });
  })
  .catch(err => {
      console.log("error: ", err);
      result(err, null);
   })
}

Categorie.findProductsByCat = (categorieId, result) => {
      sql.query(`select T_Products.id, T_Products.name, T_Products.brand, T_Products.price from T_Products inner join T_Categories on T_Products.idCategorie = T_Categories.id where T_Categories.id=${categorieId}`)
      .then(rows => {
            result(null,rows);
       })
       .catch(err => {
            console.log("error: ", err);
            result(null, err);
       })
}


Categorie.findById = (categorieId, result) => {
  sql.query(`SELECT * FROM T_Categories WHERE id = ${categorieId}`).then(res => {
        if (res.length) {
              console.log("found categorie: ", res[0]);
              result(null, res[0]);
              return;
        }
        // not found Categorie with the id
        result({ kind: "not_found" }, null);
        console.log("categorie not found there");
  })
  .catch(err => {
      console.log("error: ", err);
      result(err, null);
   })
}

Categorie.getAll = result => {
  sql.query("SELECT * FROM T_Categories").then(rows => {
            result(null,rows);
       })
       .catch(err => {
            console.log("error: ", err);
            result(null, err);
       })
}

Categorie.updateById = (id, categorie, result) => {
  sql.query("UPDATE T_Categories SET name = ?, description = ? WHERE id = ?",[categorie.name, categorie.description, id]).then(res => {
          if(res.affectedRows == 0) {
                // not found Categorie with the id
                result({ kind: "not_found" }, null);
                return;
          }
          console.log("updated T_Categories: ", { id: id, ...categorie });
          result(null, { id: id, ...categorie });
      })
      .catch(err => {
            console.log("error: ", err);
            result(null, err);
      })
}

Categorie.remove = (id, result) => {
  sql.query("DELETE FROM T_Categories WHERE id = ?", id).then(res => {
        if (res.affectedRows == 0) {
              // not found Categorie with the id
              result({ kind: "not_found" }, null);
              return;
        }
        console.log("deleted T_Categories with id: ", id);
        result(null, res);
  })
  .catch(err => {
        console.log("deleted T_Categories with id: ", id);
        result(null, res);
  })
}

Categorie.removeAll = result => {
  sql.query("DELETE FROM T_Categories").then(res => {
       console.log(`deleted ${res.affectedRows} categories`);
       result(null, res);
  })
  .catch(err => {
      console.log("error: ", err);
      result(null, err);
   })
}

module.exports = Categorie;
