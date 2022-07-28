////// 非同步 處理機制
// 處理讀取檔案
const fs = require("fs");

//// 1. 使用 readFileSync 
// let d1 = fs.readFileSync("models/data1.json","utf8");    // 同步 , 執行完才往下
// console.log("d1 完成！！！");
// let d2 = fs.readFileSync("models/data2.json","utf8");    // 同步 , 執行完才往下
// console.log("d2 完成！！！");
// let d3 = fs.readFile("models/data3.json","utf8",()=>{}); // 非同步 , d3 為 undefined
// console.log("d3 完成！！！");

// console.log(JSON.parse(d1));
// console.log(JSON.parse(d2));
// console.log(JSON.parse(d3));

////////////////////////////////////////////////////////////////////////
//// 2. 使用 Promise 
// 1) 宣告 Promise 
// let readFilePromise = (dataPath)=>{
//   return new Promise((resolve,reject)=>{
//     fs.readFile(dataPath , "utf8" , (err,data)=>{  
//       if(err){
//         reject(err);
//       }else{
//         resolve(JSON.parse(data));
//       };
//     });
//   });
// };

// 2) 使用 Promise
// readFilePromise("./models/data1.json")
//   .then(result=>{
//     console.log("我是 .then 區 ~~~");
//     console.log(result);
//   })
//   .catch(err =>{
//     console.log("我是 .catch 區！！！")
//     console.log(err);
//   });



// console.log("-".repeat(50));

//// Promise 特性
// flipCoin function
// let flipCoin = ()=>{
//   return new Promise( (resolve,reject)=>{
//     // 延遲時間 執行 , 以毫秒 (ms) 為單位 
//     setTimeout(()=>{
//       if(Math.random() >0.2){
//         resolve("上課囉！！！");
//       }else{
//         reject("翹課 -.-");
//       }
//     } , 500);
//   });
// };

// 使用 .then / .catch 
// 處理 "成功" / "失敗" 狀態
// flipCoin()
//   .then(result=>{
//     console.log("我是 flipCoin 的 .then 區～");
//     console.log(result);
//   })
//   .catch(err=>{
//     console.log("我是 flipCoin 的 .catch 區!!!");
//     console.log(err);
//   });

// .then 可多接幾段 , 並用 return 往下傳值
// flipCoin()
//   .then(result=>{
//     console.log("我是 flipCoin 的 .then 區～");
//     console.log(result);
//   })
//   .then(r2=>{
//     console.log("r2 :",r2);
//     console.log("這是第二個！！！");
//     return "ABCD";
//   })
//   .then(r3=>{
//     console.log("r3 :",r3);
//     console.log("這是第三個！！！");
//   })
//   .then(r4=>{
//     console.log("這是第四個！！！");
//   })
//   .catch(err=>{
//     console.log("我是 flipCoin 的 .catch 區!!!");
//     console.log(err);
//   });

// flipCoin()
//    .then(r=>{
//        console.log(r);
//        return "-> 雖然都起床了";
//    })
//    .then(r=>{
//        console.log(r);
//        return "-> 昨天太晚睡 ,還是再睡一點吧";
//    })
//    .then(r=>{
//        console.log(r);
//        return "-> 沒精神無法上課呢";
//    })
//    .then(r=>{
//        console.log("-".repeat(30));
//        console.log("翹課-.-");
//    })
//    .catch(err=>{
//        console.log(err);
//    });

// Promise.all
// a. 全部完成 (fulfilled , 成功狀態) --> 進入 .then  區
// b. 只要有一個 rejected (失敗狀態)  --> 進去 .catch 區
// Promise.all([
//     flipCoin(),
//     flipCoin(),
//     flipCoin()
//   ])
//   .then(r=>{
//     console.log("我是 Promise.all 的 .then 區!!!");
//     console.log(r);
//   })
//   .catch(err=>{
//     console.log("我是 Promise.all 的 .catch 區!!!");
//     console.log(err);
//   });

// let output = {}; 

// 使用 Promise 讀取 3 個檔案
// readFilePromise("./models/data1.json")
//       .then(data1=>{
//         output["data1"] = data1;
//         return readFilePromise("./models/data2.json")
//       })
//       .then(data2=>{
//         output["data2"] = data2;
//         return readFilePromise("./models/data3.json")
//       })
//       .then(data3=>{
//         output["data3"] = data3;
//         console.log(output);
//       })
//       .catch(err=>{
//         console.log(err);
//       });


////////////////////////////////////////////////////////////////////////
//// 3. async / await (ECMAScript 2016 ~ 2017 , ES7)
// 定義 flipCoin function 
let flipCoin = ()=>{
  return new Promise( (resolve,reject)=>{
    // 延遲時間 執行 , 以毫秒 (ms) 為單位 
    setTimeout(()=>{
      if(Math.random() >0.2){
        resolve("上課囉！！！");
      }else{
        reject("翹課 -.-");
      }
    } , 500);
  });
};

// 使用 flipCoin 
// Promise 版
// flipCoin()
//   .then(r=>{
//     console.log("成功 !!!",r);
//   })
//   .catch(err=>{
//     console.log("失敗 ...",err);
//   });

// async / await 版
let main = async () => {
  // 使用 try-catch 做錯誤處理
  try {
    let r = await flipCoin();   // 轉成 '同步' 語言執行 --> 執行完才會往下走
    // let r = flipCoin();      // 沒加 'await' --> 還是 '非同步'
    console.log("Async / Await 完成！！！");
    console.log(r);
  } catch(err){
    console.log(err);
  };
};

main();


// 讀3個檔案 (async / await)
let readFilePromise = (dataPath)=>{
  return new Promise((resolve,reject)=>{
    fs.readFile(dataPath , "utf8" , (err,data)=>{  
      if(err){
        reject(err);
      }else{
        resolve(JSON.parse(data));
      };
    });
  });
};

let main2 = async ()=>{
  try{
    // 1. 使用 await 轉成 '同步'語法 (執行完才會往下)
    // 2. await 後的 function , 要 return Promise 
    // 3. await 要在 async function 內才可執行
    // 4. 使用 try-catch 錯誤處理 (取代 .then / .catch)

    // 正常執行區塊
    let output = {};
    let data1 = await readFilePromise("./models/data1.json");
    let data2 = await readFilePromise("./models/data2.json");
    let data3 = await readFilePromise("./models/data3.json");
    output["data1"] = data1;
    output["data2"] = data2;
    output["data3"] = data3;
    console.log(output);
  }catch(err){
    // 發生錯誤時, 執行區塊
    console.log("我是 catch 錯誤區！");
    console.log(err);
  };
};

main2();

