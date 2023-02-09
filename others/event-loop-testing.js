// const fs = require("fs");

// setTimeout & setImmediate 都有可能先執行到
// 故順序不一定 (timer & check macroTaskQueue 打架)

// setTimeout(()=>{
//     console.log("SetTimeout 1 !!!");
// });

// setTimeout(()=>{
//     console.log("SetTimeout 2 !!!");
// });

// setImmediate(()=>{
//     console.log("SetImmediate !!!");
// });

////////////////////////////////////////////////////////////////////////

// 因放在 fs.readFile 的 callback 中, 此時 event-loop 在 poll phase 
// 下一個 phase 為 check , 故 SetImmediate 必然先執行！！！

// const fs = require("fs");

// fs.readFile("abcqq.txt","utf8",(err,data)=>{
//     setTimeout(()=>{
//         console.log("SetTimeout 1 !!!");
//     });
    
//     setImmediate(()=>{
//         console.log("SetImmediate !!!");
//     });
// });


////////////////////////////////////////////////////////////////////////
// console.log("start");  // sync , 立馬

// process.nextTick(()=>{  // 放入 nextTickQueue (1st) [優先級順序]
//     console.log("nextTick 1");
// });

// setTimeout(()=>{ // 放入 timer marcoTaskQueue (3rd)
//     console.log("setTimout");
// });

// new Promise((s,r)=>{  // 創建 promise object , sync 立馬
//     console.log("promise");
//     s();
// }).then(r=>{ // promise callback , 放入 microTaskQueue (2nd)
//     console.log("promise then");
// });

// (async()=>{  // async 語法 , 如同創建 promise object , sync 立馬
//     console.log("async");
// })();

// setImmediate(()=>{  // 放入 check marcoTaskQueue (3rd)
//     console.log("setImmediate");
// });

// process.nextTick(()=>{ // 放入 nextTickQueue (1st)
//     console.log("nextTick 2");
// });

// console.log("end"); // sync , 立馬

// start 
// promise
// async
// end
// nextTick 1
// nextTick 2
// promise then 
// setTimeout 
// setImmediate

////////////////////////////////////////////////////////////////////////
// setTimeout(()=>{
//     console.log("setTimeout 1");
//     Promise.resolve().then(_=>{
//         console.log("promise");
//     });
// });

// setTimeout(()=>{
//     console.log("setTimeout 2");
// });
////////////////////////////////////////////////////////////////////////
// setTimeout(()=>{
//     console.log("time out");
// });

// setImmediate(()=>{
//     console.log("set Immediate");
// });

// process.nextTick(()=>{
//     console.log("nextTick");
// });

////////////////////////////////////////////////////////////////////////
// const fs = require("fs"); 
// console.log("start");  // 1. sync, 立馬

// fs.readFile("abcqq.txt","utf8",(err,data)=>{ // callback 放入 poll marcoTaskQueue 中

//     // 4. 沒意外, 這個會先到, 此時 event-loop 在 poll phase 中
//     // 但遇到 setTimeout , callback 放入 timer macroTaskQueue 中
//     // 等待下一 round event-loop 才執行
//     setTimeout(()=>{
//         // 7. 下一 round 的 timer phase 到來
//         //    執行 timer macroTask
//         console.log("done 1 !!!");
//         console.log("SetTimeout 1 !!!");
//     },10);
// });

// let r2 = new Promise((resolve,reject)=>{
//     console.log("promise"); // 2. new Promise , sync , 立馬

//     // 約 5ms 完成
//     fs.readFile("abcqq.txt","utf8",(err,data)=>{  // callback 放入 poll marcoTaskQueue 中
//         // 5. 執行該 macroTask (readFile 的 callback)
//         //    Promise resolve , callback 放入 microTaskQueue
//         resolve("done 2 !!!");
//     });
// });

// r2.then(r=>{
//     // 6. 執行 microTaskQueue
//     console.log(r);
//     console.log("promise then !!!");
// });

// console.log("end"); // 3. sync , 立馬

// start
// promise
// end 
// done 2 !!!
// promise then !!!
// done 1 !!!
// SetTimeout 1 !!!

////////////////////////////////////////////////////////////////////////

// let cnt = 0; // sync

// setTimeout(()=>{  // cb 放入 timer macroTaskQueue
//     console.log("setTimeout !!!");
// });

// setImmediate(()=>{ // cb 放入 check macroTaskQueue
//     console.log("setImmediate 1 !!!");
// });

// let f = ()=>{
//     cnt++;
//     if(cnt >10) return;
//     console.log(`This is ${cnt} count.`);

//     // f 放入 nextTickQueue , 應優先級最高, 故繼續執行！！
//     // blocking 了啦！！！
//     // process.nextTick(f); 

//     // f 放入 check macroTaskQueue , event-loop 開始執行
//     // 可讓 setTimeout & setImmediate 1 都執行到～
//     setImmediate(f);
// };

// f();

////////////////////////////////////////////////////////////////////////
// express 在 event-loop 上的表現
// const express = require("express");
// const app = express();


// app.get("/",(req,res)=>{
//     res.send("HiHi !!!");
// });


// app.listen(8088,()=>{
//     console.log("Server is running at localhost:8088");
// });

////////////////////////////////////////////////////////////////////////
// setTimeout(()=>{   // 放入 timer macroTaskQueue
//     console.log(3);
// });

// let p = new Promise((resolve,reject)=>{  // new Promise object , sync
//     for(let i =0 ; i< 1000000000 ; i++){}; // for-loop , sync
//     resolve(); // promise resolve
// });

// p.then(r=>{  // 放入 microTaskQueue
//     console.log(2);
// });

// process.nextTick(()=>{
//     console.log(4);
// });

// console.log(1); // sync 

// setTimeout 放入 timer macroTaskQueue
//    -> new Promise 
//    -> for-loop 
//    -> promise resolve
//    -> promise cb 放入 microTaskQueue
//    -> process.nextTick 將 cb 放入 nextTickQueue
//    -> console.log(1)
//    -> console.log(4) (1st nextTickQueue)
//    -> console.log(2) (2nd microTaskQueue)
//    -> console.log(3) (3rd macroTaskQueue)

////////////////////////////////////////////////////////////////////////
// const OS = require("os");

// console.log(OS.cpus().length);
process.env.UV_THREADPOOL_SIZE = 6; // 調整 libuv 裡的 thread_pool_size , 即為 thread size (default 為 4)

const start = Date.now();
const crypto = require("crypto");
const fs = require("fs");
function doHash() {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('Hash:', Date.now() - start);
    });
}

doHash();
doHash();
doHash();
doHash();

fs.readFile("./a.js", "utf8", () => {
    console.log('FS:', Date.now() - start);
})


// doHash();
// doHash();
// doHash();
// doHash();