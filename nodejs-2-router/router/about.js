const express = require("express");
const router  = express.Router();

router.get("/",(req,res)=>{
  res.send("這是 /about 的 router");
});

// /about/testqq?name=Jeff
router.get("/testqq",(req,res)=>{
  let name = req.query.name;
  res.send(`我是 /about/name , 您好 ${name}`);
});

module.exports = router;

