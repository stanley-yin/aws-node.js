const express = require("express");
const app = express();
const port = 3006;
const port2 = 3007;
const db = require("./connect-sql");
const SocketServer = require("ws").Server;
const cors = require("cors"); // CORS


const corsOptions = {
  // 協助拿到cookie資料
  credentials: true,
  origin: (origin, cb) => {
    console.log(`origin:${origin}`);
    cb(null, true);
  },
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false })); // false 不使用 qs的套件
// app.use(express.json());

//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
const server = express().listen(port2, () =>
  console.log(`Ws Listening on ${port2}`)
);

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send(`Welcome to my server! This is the homepage on port ${port}`);
});

app.get("/member", async (req, res) => {
  const sql = "SELECT * FROM `user_name`";
  const [r] = await db.query(sql);
  res.send(r);
});

app.get("/myname/:name", (req, res) => {
  res.send(`Hello ${req.params.name}, welcome!`);
});

// 跳跳豬遊戲 ==================================================

// 讀取紀錄
app.get('/get-score',async(req,res)=>{
  const output = {
    success: false,
    error: "",
  };

  const sql = 'SELECT * FROM game_record'
  const [r] = await db.query(sql)
  res.send(r)
})

// 新增紀錄
app.post("/input-score",async (req, res) => {
  console.log(req.body)
  const output = {
    success: false,
    error: "",
  };

  const sql = `INSERT INTO game_record(
    player_name,
    score
  ) VALUES (?,?)`;

  const [r] = await db.query(sql, [req.body.player_name, req.body.score]);

  !!r.affectedRows ? true : false;
  if (r.affectedRows) {
    output.success = true;
    res.send(output);
  }
});

// websocket 功能 ==============================================
wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (data) => {
    //取得所有連接中的 client
    let clients = wss.clients;

    //做迴圈，發送訊息至每個 client
    clients.forEach((client) => {
      client.send(data);
    });
  });

  ws.on("close", () => {
    console.log("Close connected");
  });
});
