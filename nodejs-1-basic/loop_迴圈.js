//// 流程控制#2 - 迴圈
// let arr1 = [97,100,85,77,89,77,65];
// let sum1 = arr1[0] + arr1[1] + arr1[2] + ... ; --> 不佳

// for-loop 
console.log("Start !!!");

for(let i = 0 ; i < 10 ; i++){
  console.log(i);
};

for(let j=0 ; j<6 ; j = j + 1){
  console.log("第" + j + "次執行");
};

for(let k = 11 ; k>=0 ; k = k-2){
  console.log("嗨嗨嗨嗨嗨");
  console.log(k);
  console.log("----------");
}
console.log("End !!!");

let arr1 = [97,100,85,77,89,77,65,77,33,47,56];
let sum1 = 0;

// for(let i=0 ; i <=6 ; i++){  結束條件寫 i<=6 不佳
   
for(let i=0 ; i <= arr1.length-1 ; i++){ // 結束條件寫 i<=arr1.length-1 好！
  // console.log(arr1[0]);
  // console.log(arr1[1]);
  // console.log(arr1[2]);
  // console.log(arr1[i]);

  sum1 = sum1 + arr1[i];
  // i=0 -> sum1 = (0)  + 97  = 97;
  // i=1 -> sum1 = (97) + 100 = 97+100;
  // i=2 -> sum1 = (97+100) + 85 = 97+100+85;
  // i=3 -> sum1 = (97+100+85) + 77 = 97+100+85+77;
  // ... 
  // i=arr1.length-1 算完結束

};

console.log("arr1 總和 :" , sum1);
console.log("arr1 平均 :" , sum1 / arr1.length );

console.log("-".repeat(50));
/////////////////////////////////////////////////////////////////////// 
///// 小試身手#4-1

// 1. 計算 1+2+3+…+100 之總和
let sum2 = 0;
for(let i=1 ; i<=100 ; i++){
  // console.log(i);
  // sum2 = sum2 + i;
  sum2 += i;  // sum2 疊加 i 值
};
// console.log("總和 :" , sum2);
console.log(`總和 : ${sum2}`);


// 2. 試撰寫一程式 , 列印出以下圖形  (repeat)
//     ******
//     *****
//     ****
//     ***
//     **
//     *
// console.log("*".repeat(6));
// console.log("*".repeat(5));
// console.log("*".repeat(4));
// console.log("*".repeat(3));
// console.log("*".repeat(2));
// console.log("*".repeat(1));

for(let i =6 ; i>0 ; i--){
  console.log("*".repeat(i));
};

// 3.  有一變數 teacherName="Jack!" , 試撰寫一程式 , 列印出下列訊息
//     JJJJJ
//     aaaa
//     ccc
//     kk
//     !
// let teacherName = "Jack!";
// console.log(teacherName[0].repeat(5));
// console.log(teacherName[1].repeat(4));
// console.log(teacherName[2].repeat(3));
// console.log(teacherName[3].repeat(2));
// console.log(teacherName[4].repeat(1));

let teacherName = "Jack!";

for(let i =0 ; i< teacherName.length ; i++){
  console.log(teacherName[i].repeat(5-i));
  // console.log(i);
};
   
