const express = require("express");
const app = express();
const port = 3006;
const db = require('./connect-sql')


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/",  (req, res) => {
  res.send(`Welcome to my server! This is the homepage on porter ${port}`);

  
});

app.get("/member",  async (req, res) => {
  const sql = 'SELECT * FROM `user_name`'
  const [r] = await db.query(sql)
  res.send(r);
});


app.get("/myname/:name", (req, res) => {
  res.send(`Hello ${req.params.name}, welcome!`);
});
