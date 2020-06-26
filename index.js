const path = require("path")

const bodyParser = require("body-parser");

const db = require("./src/models/db")

const app = require("express")()

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// landing page of the api
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"))
});

// create a database, when running this route, mae sure you comment the database name in mysql.createConnection method
app.get("/createdb", (req, res) => {
  let sql = "Create database niuzieApp"

  db.query(sql, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

// create seller table
// app.get("/createSellerTable", (req, res) => {
//   let sql = "Create table sellers(id varchar(36) Primary key, firstName varchar(255), lastName varchar(255), email varchar(255), tel varchar(255) )"

//   db.query(sql, (err, result) => {
//     if (err) throw err
//     res.json(result)
//   })
// })

// app.get("/createProductsTable", (req, res) => {
//   let sql = "create table products()"

//   db.query(sql, (err, result) => {
//     if (err) throw err
//     res.json(result)
//   })
// })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))