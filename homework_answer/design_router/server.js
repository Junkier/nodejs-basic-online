const express = require("express");
const app = express();
const portNum = 8088;

const helloRouter = require("./router/hello");
const introductionRouter = require("./router/introduction");

app.get("/",(req,res)=>{
  res.send("This is Node.js server");
});

app.use("/hello" , helloRouter); 
app.use("/introduction" , introductionRouter);

app.listen(portNum,()=>{
  console.log(`Server is running at localhost:${portNum}`);
});