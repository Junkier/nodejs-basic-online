const express = require("express");
const app = express();
const portNum = 8088;

app.get("/" , (req,res)=>{
  res.send("嗨嗨,  我是 Node.js server.");
});

app.listen(portNum , ()=>{
  console.log(`Server is running at localhost:${portNum}`);
});
