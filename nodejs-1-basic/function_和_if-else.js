//// Function
// let arr1 = [1,2,3,4,5];
// console.log(arr1.map(n=>n*2));

// 早期的 function 
let add1 = function(a,b){
  return a+b;
};

// 現在 arrow function
let add2 = (a,b) => {
  return a+b;
};


console.log( "add1(3,5) :",add1(3,5) );
console.log( "add1(6,-5) :", add1(6,-5) );

console.log("add2(3,5) :",   add2(3,5) );
console.log("add2(6,-5) :",  add2(6,-5) );

console.log("-".repeat(50));

// 定義 (宣告) function
let sayHello = (name) => {
  //  此為 function 執行區塊 (scope)
  console.log("嗨嗨");
  console.log("我是");
  console.log(name);
  console.log("~~~~~");

  let arr3 = [3,4,5,6,7];
  console.log( arr3.map(n =>n*3) );
};

// 使用 (呼叫) function 
sayHello("Jeff!!!");

sayHello("Leo ~~~");

console.log("-".repeat(50));

//// function 特性介紹
let sayHello2 = (name2,age2) => {
  // name2 , age2 為 input (輸入參數)
  console.log("[sayHello2] 嗨嗨 , 我是" + name2 + "," + "年紀是" + age2);
}

let sayHello2_with_output = (name2,age2)=>{
  // name2 , age2 為 input (輸入參數)
  console.log("[sayHello2_with_output] 嗨嗨 , 我是" + name2 + "," + "年紀是" + age2);
  
  // return 後的東西為 output (輸出結果)
  return "下課囉！！！！";
};

// sayHello2("Jeff",18);
// sayHello2_with_output("Jeff",18);

let msg1 = sayHello2("Jeff",18);
console.log(msg1);
let msg2 = sayHello2_with_output("Jeff",18);
console.log(msg2);


let arr3 = [1,2,3,4,5];
// arr3.map(n => n*3) 等同於
let map3 = arr3.map((n) => {
  console.log(n);
  console.log("AAA");
  console.log("BBB");
  return n*3;
});

// 簡寫法
// let map3 = arr3.map( n => n*3 );
console.log("map3 :" , map3);

console.log( "-".repeat(50) );

//// function 特性介紹#2
// 全域 (Global) V.S 區域 (Local)
let test1 = ()=>{
  // num1 -> 區域變數
  var num1 = 12;
  return num1;
};

let test2 = ()=>{
  // num2 -> 區域變數
  let num2 = 15;
  return num2;
};

let test3 = ()=>{
  // num3 -> 全域變數
  num3 = 18;
  return num3;
};

console.log( test1() );
console.log( test2() );
console.log( test3() );

console.log("num3 :", num3);
// console.log("num2 :", num2);
// console.log("num1 :", num1);

//// function 特性介紹#3 
// var / let / const 差異
// var   : function scope , 值可以任意改
// let   : block scope    , 值可以任意改
// const : block scope    , 值不可任意改 (常數)
console.log("-".repeat(50));

let test4 = ()=>{
  let num4 = 123;
  // var message ;  // function scope
  let message ;  // block scope
  // const message = "";    // block scope  , 無法使用

  if(num4 >0){
    // console.log("正數！！！");
    message = "正數！！！";
    // var message = "正數！！！";      // function scope
    // let message = "正數！！！";   // block scope , 只在 if scope 內有效
    // const message = "正數！！！";
  }else{
    // console.log("負數！！！");
    message = "負數！！！";
    // var message = "負數！！！";     // function scope
    // let message = "負數！！！";  // block scope , 只在 else scope 內有效
    // const message = "負數！！！";
  };

  console.log(message);

};

test4();


console.log("-".repeat(50));
/////////////////////////////////////////////////////////////
//// 流程控制#1 if-else 
// 1. 宣告 a 變數
// a>0 --> 正數！！！
// a<0 --> 負數！！！
let a = 0;
if( a>0 ){
  console.log("正數！！！");
} else {
  console.log("負數！！！");
};

// 2. 宣告 b 變數
// b > 0   --> 正數！！！
// b === 0 --> b為0！！！
// b < 0   --> 負數！！！
let b = -123;
if(b > 0 ){
  console.log("b 為 正數！！！");
} else if( b === 0 ){
  console.log("b 為 0！！！");
} else {
  console.log("b 為 負數！！！");
};

////// 運算子 (資料間運算的符號)
// 算數運算子: + , - , * , / , % (取餘數)
console.log( 12 / 5);
console.log( 12 % 5);
console.log( 12 % 2);
console.log( 113 % 2);

// 比較運算子: > , < , == , === , != , !==
console.log( 3> 12 );  // 請問 3> 12 嗎？  V -> true ; X -> false
console.log( 27 < 30 );
console.log( 12%2 === 0);   // 左右兩邊值 是否 相等
console.log( 113%2 !== 0);  // 左右兩邊值 是否 不相等

console.log("-".repeat(50));

// == / === 差別
// ==  : 弱型別 比較
// === : 強型別 比較
console.log("1 == 1 :"   , 1 == 1);
console.log('1 == "1" :' , 1 == "1");
console.log("1 == true :", 1 == true);

console.log("1 === 1 :"   , 1 === 1);
console.log('1 === "1" :' , 1 === "1");
console.log("1 === true :", 1 === true);

console.log("-".repeat(50));


// 關係運算子: && , ||
//  && -> 交集 , 且 (and)
//  || -> 聯集 , 或 (or)
console.log("12%2 === 0 && 3>7 :", 12%2 === 0 && 3>7 );
console.log("12%2 === 0 && 3>-2 :", 12%2 === 0 && 3>-2 );

console.log("-".repeat(50));

/////// 小試身手 #3-1
// 用 number 來決定 type 組別
let number = -100;
let type;

// if - else ...
if(number >= 100) {
  type = "丁組";
} else if (number >= 50 && number < 100) {
  type = "丙組";
} else if (number >=0 && number <50) {
  type = "乙組";
} else {
  type = "甲組";
};

console.log("您的組別是 :" , type);


/////// 小試身手 #3-2
// 透過 age / gender , 顯示對應的金額
let age = 20;
let gender = "M" ; // "M" , "F"
let message3; 

// 巢狀 if-else
// if( gender === "F"){
//   // 女生
//   message3 = "您的消費金額為 $500";
// } else {
//   // 男生
//   if( age >= 30){
//     // 男生 && age >= 30 
//     message3 = "您的消費金額為 $1000";
//   }else{
//     message3 = "您的消費金額為 $700";
//   }
// };

if( gender === "F"){
  message3 = "您的消費金額為 $500";
} else if ( gender === "M" && age >=30){
  message3 = "您的消費金額為 $1000";
} else if ( gender === "M" && age < 30){
  message3 = "您的消費金額為 $700";
};

console.log(message3);