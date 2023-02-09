// // function *testQQ(){
// //     yield "A";
// //     yield "B";
// //     yield "C";
// // };


// // let generator = testQQ();
// // console.log(generator.next());
// // console.log(generator.next());
// // console.log(generator.next());
// // console.log(generator.next());
// // console.log(generator.next());


// function *signal(){
//     let cnt = 0;
//     while(true){
//         let mod = cnt % 6;
//         if(mod === 0 || mod === 1 || mod === 2) yield "R";
//         if(mod === 3 || mod === 4 ) yield "G";
//         if(mod === 5 ) yield "Y";
//         cnt++;
//     };
// };

// function main(){
//     try{
//         let gen = signal();

//         setInterval(()=>{
//             let r = gen.next();
//             console.log(r.value);
//         },1000);

//     }catch(err){
//         console.log(err);
//     }
// };


// main();



// function *testQQ2(){
//     yield "A";
//     yield "B";
//     yield "C";
//     yield "D";
//     return "E"
// };

// for(let w of testQQ2()){
//     console.log(w);
// }


// function *testQQ3(){
//     while(true){
//         yield "R";
//         yield "R";
//         yield "R";
//         yield "G";
//         yield "G";
//         yield "Y";
//     };
// };

// const t = testQQ3();

// (()=>{
//     setInterval(()=>{
//         console.log(t.next().value);
//     },1000);
// })()


////////////////////////////////////////////////////////////////

// const fs = require("fs");

// fs.readdir("./tiny-job",(err,files)=>{
//     if(err) console.log(err);
//     console.log(files);
// });

// function readQQ(){
//     return new Promise((s,r)=>{
//         fs.readdir("./tiny-job",(err,files)=>{
//             if(err) r(err);
//             else s(files);
//         });
//     });
// };
// readQQ()
//     .then(r=>{
//         console.log(r);
//     })
//     .catch(err=>{
//         console.log(err);
//     });


// // 協程 ！！！
// const co = require("co");

// function *testQQ1(){
//     console.log("execition 1");
//     console.log(yield Promise.resolve(1));
//     console.log("execition 2");
//     console.log(yield Promise.resolve(2));
// };

// function *testQQ2(){
//     console.log("execition a");
//     console.log(yield Promise.resolve("a"));
//     console.log("execition b");
//     console.log(yield Promise.resolve("b"));
// };

// co(testQQ1);
// co(testQQ2);


//// generator 好用狀態機
// function *testJJ(){
//     while(true){
//         yield "R";
//         yield "R";
//         yield "R";
//         yield "G";
//         yield "G";
//         yield "Y";
//     };
// };

// const generator = testJJ();

// setInterval(()=>{
//     console.log(generator.next().value);
// },500)


// function sayHello1(){
//     setTimeout(()=>{
//         console.log("Hello1 !!!");
//     },1000);
// };
// function main1(){
//     let data = sayHello1();
//     console.log(data);
//     console.log("Done!");
// };

// main1();

// function sayHello2(){
//     return new Promise((s,r)=>{
//         setTimeout(()=>{
//             console.log("Hello1 !!!");
//             s("QQ");
//         },1000);
//     });
// };

// async function main2(){
//     let data = await sayHello2();
//     console.log(data);
//     console.log("Done!");
// };

// main2();

// function sayHello3(){
//     return new Promise((s,r)=>{
//         setTimeout(()=>{
//             console.log("Hello1 !!!");
//             s("QQ");
//         },1000);
//     });
// };

// function *main3(){
//     let data = yield sayHello3();
//     console.log(data);
//     console.log("Done!");
// }

// co(main3);


// 使用 co 協程套件, 自動管理 generator 執行權
// const co = require("co");

// 自行手刻 co 協程套件
function co(fn){
    if(!fn) return;

    return new Promise((s,r)=>{
        let generator = fn();

        function step(next){
            if(next.done) s(next.value);
            else{
                // Promise.resolve(next.value)
                next.value  // next.value 為 Promise , resolve 後, 回到 yield 往下執行
                       .then(r=>{
                            return step(generator.next(r));
                       })
                       .catch(err=>{
                            return step(generator.throw(err));
                       });
            };
        };


        step(generator.next());
        
    });
};

function sayHello4(){
    return new Promise((s,r)=>{
        setTimeout(()=>{
            console.log("Hello1 !!!");
            s("QQ");
        },1000);
    });
};

function sayHello5(){
    return new Promise((s,r)=>{
        setTimeout(()=>{
            console.log("Hello2 !!!");
            s("KK");
        },1500);
    });
};


function *main4(){
    let data1 = yield sayHello4(); 
    console.log(data1);

    let data2 = yield sayHello5();
    console.log(data2);

    console.log("Done !!!");
};


// co 參數為 generator fn 
// co(main4);


////
// 對照 async / await
async function main5(){
    let data1 = await sayHello4();
    console.log(data1);

    let data2 = await sayHello5();
    console.log(data2);

    console.log("Done!!!");
};

main5();


////// 結論
// * Promise
// 封裝 callback處理 的一種 class , 為 Js 用來處理 async task 的資料類型 (語法糖)

// * async / await 底層實作
// 使用 generator(yield) + Promise + coroutine 實作
// 為 ES7 的更猛語法糖
// 包成 async / await 神之好用~