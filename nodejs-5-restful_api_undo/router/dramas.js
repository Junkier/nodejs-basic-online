const express = require("express");
const fs = require("fs");
const router = express.Router();

let readFilePromise = (dataPath)=>{
  return new Promise( (resolve , reject) =>{
    fs.readFile(dataPath,"utf8" , (err,data)=>{
      if(err) reject(err);
      else resolve( JSON.parse(data) );
    });
  });
};

// /dramas/page --> 回傳 dramas.html
router.get("/page" , (req,res)=>{
  res.render("dramas.html");
}); 


// GET /dramas/getDramaListData  --> 取得 資料
// => 改成 GET /dramas/list
router.get("/list" , async (req,res)=>{   // API 佳 ！！!
// router.get("/getDramaListData" , async (req,res)=>{  // API 不佳
  // res.json({ message : "嗨嗨～～～"});

  //// 純 讀取 models/sample2.json  , response 給前端
  // try {
  //   let data = await readFilePromise("models/sample2.json");
  //   res.json({ result : data });
  // } catch (err){
  //   res.status(500).json({ message: "系統有問題！"});
  // };


  //// 讀取 models/sample2.json  
  //// 再透過 type 過濾資料 , 最後 response 給前端
  try {
    let data = await readFilePromise("models/sample2.json");
    let type = req.query.type;

    // console.log(testJJJJ);
    // console.log(data);
    // console.log(type);

    // 過濾資料
    if( type === "全"){
      res.json({ result : data });
    }else{
      let filteredData = data.filter( ele => ele["category"] === type );
      res.json({ result : filteredData });
    };

  } catch (err){
    ////// Status code 整理
    // 2xx --> 請求 ok
    // 3xx --> 請求 ok , 但資源換位置 , response 會告訴你下一個位置
    // 4xx --> Client 端問題 , ex: 參數帶錯
    // 5xx --> Server 端問題 , ex: server.js 出現 bug 
    console.log(err);
    res.status(500).json({ message: "系統有問題！"});
  };
});


// POST /dramas/CreateNewDramaData  --> 新增資料 
// => 改成 POST /dramas/data
router.post("/data" , async (req,res) =>{  // API 佳 ！！！
// router.post("/CreateNewDramaData" , async (req,res)=>{ // API 不佳
  try{
    // 取得前端傳來 Form Data 的參數值
    // console.log("req.body:",req.body);
    let payload = req.body;
    console.log(payload["category"]);
    console.log(payload["name"]);

    // 將 req.body (Form Data) 寫入到 sample2.json 裡
    // 1. 先讀出此 Array
    let data = await readFilePromise("models/sample2.json");

    // 2. 使用 .push 
    data.push(req.body);

    // 3. 再把 資料寫出去 sample2.json (同步處理)
    // fs.writeFileSync("models/sample2.json", data , "utf8");  // 會錯誤 , fs.writeFileSync 只接受 string
    fs.writeFileSync("models/sample2.json", JSON.stringify(data) , "utf8");

    res.json({message : "ok."});
  } catch(err){
    console.log(err);
    res.status(500).json({ message : "系統有問題！"});
  };
});

module.exports = router;