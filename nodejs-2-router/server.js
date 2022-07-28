const express = require("express");
const app = express();
const portNum = 8088;

// [module][2] 引入 /router/books.js 程式
const booksRouter = require("./router/books.js");  // . -> 當前目錄
const aboutRouter = require("./router/about");     // .js 可忽略不寫

// 路由設定 / end-point 設定 / API 設計
app.get("/" , (req,res)=>{
  res.send("嗨嗨,  我是 Node.js server.");
});

// app.get("/books/page",()=>{ ... });

//// 將 /books , /about 處理機制轉到 router 去
// /books/page
// /books/data 
// /about/page 
// /about/hihi

// [module][3] 將 /books 的 requests , 導入到 booksRouter 處理
app.use("/books" , booksRouter);
app.use("/about" , aboutRouter);

app.listen(portNum , ()=>{
  console.log(`Server is running at localhost:${portNum}`);
});
