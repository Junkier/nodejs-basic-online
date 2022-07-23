////// 回家試身手1-檢討
// 1.
for(let i = 0 ; i < 11 ; i++){
  // console.log(i);
  // if(i<6){
  //   console.log("*".repeat(6-i));
  // }else{
  //   console.log("*".repeat(i-4));
  // };

  // 可省略 {} 不寫
  if(i<6) console.log("*".repeat(6-i));
  else console.log("*".repeat(i-4));
};

console.log("-".repeat(50));

// 2. Word Count (字詞統計)
let data = ["a","b","c","c","c","a","d","b","b","a","c","d","kk","a"];
let result = {};  // 期望最終長成 { "a" : 3 , "b" : 5 , "c" : 3 } 

for(let i = 0 ; i < data.length ; i++){
  let key = data[i];
  // console.log(key); 
  // 檢查元素是否在 result 裡
  // V -> value += 1
  // X -> 新增一組 key-value pair --> ex: "a" : 1

  // 有值 --> 直接抓 value , 視為 true
  // 無值 --> 得到 undefined , 視為 false
  // 0 , null , undefined ==> 都會視為 false 
  if(result[key]){  
    result[key] += 1;
  }else{
    result[key] = 1;
  };

  // if(key in result){  // 檢查 key 值是否存在於 Object 中 , ex: check "a" 是否在 Object 裡
  //   result[key] += 1;
  // }else{
  //   result[key] = 1;
  // };
}; 

console.log(result);

//// 檢查 key 是否存在於 Object
let data2 = { name : "jeff" , age : 18 };
console.log("name" in data2);
console.log("age" in data2);
console.log("message" in data2);

console.log(data2["name"]);     // 取出 value
console.log(data2["age"]);      // 取出 value
console.log(data2["message"]);  // key 不存在 , 得到 undefined
console.log(data2["testqq"]);
////

console.log("-".repeat(50));


// 3. 九九乘法表
// (1) 純顯示結果
// for(let i = 1 ; i < 10 ; i++){
//   for(let j = 1 ; j < 10 ; j++){
//     // console.log(i,j);
//     console.log(`${i}x${j}=${i*j}`);
//   };
// };

// (2) 排列成方陣
for(let i = 1 ; i < 10 ; i++){

  // 宣告一個 message 
  let message = "";

  // 合併成大字串 -> "1x1=1 1x2=2 ... 1x9=9"
  for(let j = 1 ; j < 10 ; j++){
    // console.log(i,j);
    // console.log(`${i}x${j}=${i*j}`);

    // 透過 if-else 決定 space 空白個數
    // 寫法不佳
    // let space = "";
    // if(i*j <10) space = "  ";  // 單位數 -> 兩個空白
    // else space = " ";          // 雙位數 -> 一個空白

    // 三元運算子 
    let space = (i*j < 10) ? "  " : " ";
    message += `${i}x${j}=${i*j}${space}`;
  };

  // 再輸出顯示
  console.log(message);
};

//// 三元運算子 
// (條件判斷) ? (True的回傳值) : (False的回傳值)
let a = -50;
let msg2 = a>0 ? "正數！！！" : "負數～～";
console.log(msg2);
////
console.log("-".repeat(50));

// 4. 費式數列
// 1,1,2,3,5,8,13,21,...
let fibonacci = (n) => {
  if(n === 1 || n === 2) return 1;   // return 回傳結果 & 結束 function 

  let a1 = 1;
  let a2 = 1;
  let r = 0;

  // n=3 ->  執行 1 次
  // n=4 ->  執行 2 次
  // n=5 ->  執行 3 次
  // ...
  // -> 執行 n-2 次
  for(let i=0 ; i < n-2 ; i++){
    r = a1 + a2;
    a1 = a2 ; // 移動 a1
    a2 = r  ; // 移動 a2
  };

  return r;
};

// 顯示 費氏數列 值
for(let k=1 ; k<10 ; k++){
  console.log(fibonacci(k));
};

console.log("-".repeat(50));

////////////////////////////////////////////////////////////////
//// while-loop
let cnt = 0;
let limit = 50;

console.log("While loop 開始");

// 只要 ...
// while(cnt< 10){
//   console.log(`第 ${cnt} 次執行`);
//   cnt++;  //  等同於 cnt +=1
// };

// 另一種寫法
while(true){
  console.log(`第 ${cnt} 次執行`);
  cnt++;

  // 結束條件
  if(cnt === limit){
    console.log("執行 break!!!");
    break  // 終止迴圈
  };
};

console.log("While loop 結束");

console.log("-".repeat(50));


//// 大樂透 抽號碼
console.log( Math.random() );     // 0 <= x < 1   的小數
console.log( Math.random()*49 );  // 0 <= x < 49  的小數
console.log( Math.ceil( Math.random()*49 ) );  // 1 <= x <= 49 無條件進位的整數


let nums = []; // 從 1 ~ 49 可重複地抓 6 個數字出來

while(nums.length <6){
  
  // 單純地 可重複抓 6 個數字出來
  // let n = Math.ceil( Math.random()*49);
  // nums.push(n);


  // 不可重複地 抓 6 個數字出來
  // 檢查元素是否在 array 裡
  let n = Math.ceil( Math.random()*49);
  if(!(nums.includes(n))){  // 若 n 不在 nums 裡的話
    nums.push(n);
  }else{
    console.log(`${n} 重複了！！！` , nums);
  };
};

console.log(nums);

// 將 Array 排序
console.log("從小排到大 :", nums.sort( (a,b) => a-b ) );
console.log("從大排到小 :", nums.sort( (a,b) => b-a ) );

//// includes
// console.log( [1,2,3,4,5].includes(3)  );
// console.log( [1,2,3,4,5].includes(5)  );
// console.log( [1,2,3,4,5].includes(0)  );
// console.log( [1,2,3,4,5].includes(123)  );
////



