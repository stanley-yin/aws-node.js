const express = require("express");
const app = express();
const port = 3006;
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "ls-d79d603c118a2aba867250d55cdd2bf276ac871d.cxkg1sljtrq7.ap-northeast-1.rds.amazonaws.com",
  user: "dbmasteruser",
  database: "test1",
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send(`Welcome to my server! This is the homepage on porter ${port}`);
  connection.query(
    'SELECT * FROM `test1` WHERE `user_id` = "1"',
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
});

app.get("/:name", (req, res) => {
  res.send(`Hello ${req.params.name}, welcome!`);
});
