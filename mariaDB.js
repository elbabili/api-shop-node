const mariadb = require('mariadb');

const pool = mariadb.createPool({
     host: 'localhost',
     user:'root',
     password: 'maryam',
     database : 'Ecom'
});

pool.getConnection()
    .then(conn => { //si connection ok alors faire requetes

      console.log("ok connection")
      conn.query("SELECT * from product").then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.end();
        })
        .catch(err => {
          //handle error
          console.log(err); 
          conn.end();
        })
        
    }).catch(err => {
      //not connected
    });