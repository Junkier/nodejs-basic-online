////// moment 套件操作
// 時間處理相關
const moment = require("moment");
console.log(moment());  // 取得現在時間
console.log(moment().format("YYYY-MM-DD HH:mm:ss")); // 時間顯示
console.log(moment().format("YYYY/MM/DD")); // .format 做時間格式轉換

// 時間格式轉換
console.log(moment("2021/12/18 14.12","YYYY/MM/DD HH.mm").format("YYYY-MM-DD HH:mm:ss"));

// 時間計算
let nextMonth = moment().add(1,"months").format("YYYY-MM-DD");
let lastYear  = moment().subtract(1,"years").format("YYYY-MM-DD");

console.log("nextMonth: ",nextMonth);
console.log("lastYear: ",lastYear);
