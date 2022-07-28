const express = require("express");
const router  = express.Router();
const fs = require("fs");

// 該 router 處理 /introduction/* 的 requests
////////////////////////////////////////////////

router.get("/",(req,res)=>{
  res.send("這是 /introduction 的 API");
});

// GET /introduction/page API
router.get("/page",(req,res)=>{
  res.send("這是 introduction 頁面");
});


// 用 Promise 處理讀檔案的 function (非同步動作)
let readFilePromise = (dataPath)=>{
  return new Promise((resolve,reject)=>{
    fs.readFile(dataPath , "utf8" , (err,data)=>{
      if(err) reject(err);  // 切換 Promise 狀態為 rejected  (失敗)
      else resolve(JSON.parse(data));   // 切換 Promise 狀態為 fulfilled (成功)
    });
  });
};


// GET /introduction/data API
router.get("/data",async (req,res)=>{
  // async / await 處理非同步
  try{
    let data = await readFilePromise("data.json");
    res.json({ result : data});
  } catch(err){
    res.send("檔案有問題！！！");
  };
});

// GET /introduction/data/:EmpNo API 
router.get("/data/:EmpNo" ,async (req,res)=>{
  try{
    let data = await readFilePromise("data.json");
    let EmpNo = req.params.EmpNo;

    let result = data.filter(ele => ele["EmpNo"] === EmpNo);
    let output = result.length >0 ? result[0] : {};
    res.json(output);

    // [
    //   { Name: 'Jeff', EmpNo: '001', Age: 18 },
    //   { Name: 'Leo', EmpNo: '002', Age: 24 },
    //   { Name: 'Keven', EmpNo: '003', Age: 26 },
    //   { Name: 'Holy', EmpNo: '004', Age: 18 },
    //   { Name: 'Jenny', EmpNo: '005', Age: 33 }
    // ]
    
    /// OK , 但還可以更好
    // if(result.length >0 ){
    //   let output = result[0];
    //   res.json(output);
    // }else{
    //   res.json({});
    // };

  }catch(err){
    res.send("檔案有問題！！！");
  };
});

module.exports = router;