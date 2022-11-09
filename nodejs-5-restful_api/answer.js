const express = require('express');
const app = express();


const hbs    = require("hbs");
const path   = require("path");


// 設定模板引擎
app.engine('html',hbs.__express);

// 設定模板 位置
app.set("views" , path.join(__dirname ,"application","views"));

// 設定靜態檔 位置
app.use(express.static(path.join(__dirname,"application")));



app.get(["/","/hello"],(req,res)=>{
    let name = req.query.name;
    res.render("answer.html",{ templateName : name });
});


app.get("/dramas/page",(req,res,next)=>{
    let name = req.query.name;
    res.render("dramas.html",{ templateName : name });
});


app.get("/testqq",(req,res)=>{
    res.render("template.html")
});

app.get("/about/us",(req,res)=>{
    res.render("aboutus.html");
});

app.listen(9099,function(){
    console.log("Server is running at http://localhost:" + String(9099));
});
