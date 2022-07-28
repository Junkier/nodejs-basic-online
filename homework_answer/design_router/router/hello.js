const express = require("express");
const router  = express.Router();

// 該 router 處理 /hello/* 的 requests
////////////////////////////////////////////////

// GET /hello/greeting 的 API
router.get("/greeting",(req,res)=>{
  res.send("Hello World!");
});

// GET /hello/?name={your_name} 的 API
router.get("/",(req,res)=>{
  let name = req.query.name;
  res.send(`Hello , ${name} ! Welcome to the Node.js ~~~. `);
});

module.exports = router;