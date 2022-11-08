const express = require("express");
const fs = require("fs");
const router = express.Router();

let readFilePromise = (dataPath)=>{
  return new Promise((resolve,reject)=>{
    fs.readFile(dataPath,"utf8",(err,data)=>{
      if(err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};


router.get("/",(req,res)=>{
  res.send("嗨嗨 ,我是 /members API ~");
});


// V 1. GET /members/all
router.get("/all",async (req,res)=>{
  try{
    let data = await readFilePromise("./data.json");
    res.json(data);
  } catch(err){
    console.log(err);
    res.status(500).json({ message : "Server 端發生錯誤！"});
  };
});

// V 2. GET /members/detail/:memNo
router.get("/detail/:memNo",async (req,res)=>{
  try{
    let data = await readFilePromise("./data.json");
    // data -> { "10001" : {...} , "10002" : {...} , ...}

    let memNo = req.params.memNo;
    let result = data[memNo];

    // 檢查 result 是否為 undefined
    if(!result){
      res.status(404).json({ message : "Not Found"});
    }else{
      res.json(result);
    };

    // console.log("result :" , result);
    // res.json(result);

  } catch(err){
    console.log(err);
    res.status(500).json({ message : "Server 端發生錯誤！"});
  };
});

// 3. V PUT /members/detail/:memNo 
router.put("/detail/:memNo",async (req,res)=>{
  try{
    // 1) 檢查 req.body (payload) 是否有 name / gender / age 這三個參數
    //    X --> res 400
    let payload = req.body;
    if(!payload["name"] || !payload["gender"] || !payload["age"]){
      res.status(400).json({ 
        message : "req.body 的資料格式有誤！"
      });
      return;  // 結束這個 處理函式  
    };

    // 2) 讀 data.json 
    // data -> { "10001" : {...} , "10002" : {...} , ...}
    let data = await readFilePromise("./data.json");

    // 3) 檢查 是否有對應的 memNo 資料
    //    X --> res 404 
    let memNo = req.params.memNo;
    if(!data[memNo]){
      res.status(404).json({ 
        message      : "Not Found" , 
        affectedRows : 0
      });
      return;
    };

    // 4) 更新資料 & res 200
    data[memNo] = payload;
    // console.log(data);

    // 把 data 資料寫出到 data.json 
    fs.writeFileSync("./data.json", JSON.stringify(data) , "utf8");

    res.json({
      message: "ok",
      affectedRows : 1
    });

  } catch(err){
    console.log(err);
    res.status(500).json({ message : "Server 端發生錯誤！"});
  };
});

// 4. POST /members 
router.post("/",async (req,res)=>{
  try{
    // 1) 檢查 req.body (payload) 是否有 name / gender / age 這三個參數
    //    X --> res 400
    let payload = req.body;
    if(!payload["name"] || !payload["gender"] || !payload["age"]){
      res.status(400).json({ 
        message : "req.body 的資料格式有誤！"
      });
      return;  // 結束這個 處理函式  
    };

    // 2) 讀 data.json 
    // data -> { "10001" : {...} , "10002" : {...} , ...}
    let data = await readFilePromise("./data.json");

    // 3) 找出最新 memNo , 並新增 payload 到 data 中
    let lastMemNo = Object.keys(data)   // -> ["10001","10002",... , "10005"]
                          .map(key => Number(key))  // -> [10001,10002, ... , 10005]
                          .sort((a,b) => b-a)[0];   // -> [10005,10004, ... , 10001]
    
    let newMemNo = lastMemNo +1 ;  // 建立最新的 memNo 

    data[newMemNo] = payload;

    // 把 data 資料寫出到 data.json 
    fs.writeFileSync("./data.json", JSON.stringify(data) , "utf8");

    res.json({
      message: "ok",
      memNo  : newMemNo
    });
  } catch(err){
    console.log(err);
    res.status(500).json({ message : "Server 端發生錯誤！"});
  };
});

// 5. DELETE /members
router.delete("/",async (req,res)=>{

  try{
    let data = await readFilePromise("./data.json");
    // data -> { "10001" : {...} , "10002" : {...} , ...}

    let memNo = req.query.memNo; // 使用 query_string 帶 memNo
    let result = data[memNo];

    // 檢查 result 是否為 undefined
    if(!result){
      res.status(404).json({ 
        message : "Not Found" , 
        affectedRows : 0
      });
      return;
    };

    // 刪除資料
    delete data[memNo];

    // 把 data 資料寫出到 data.json 
    fs.writeFileSync("./data.json", JSON.stringify(data) , "utf8");

    res.json({
      message : "ok",
      affectedRows : 1
    });

  } catch(err){
    console.log(err);
    res.status(500).json({ message : "Server 端發生錯誤！"});
  };

  // res.json({ message : "這是 DELETE /members API ."});
});


module.exports = router;