const express = require('express');
const bodyParser = require("body-parser"); // 記得 npm install body-parser
const app = express();

const portNum = 8088;

const membersRouter = require("./router/members");

app.use(bodyParser.json());

// [Body-Parser][2] 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended : false,   // 是否用 額外套件 解析字串
  limit : "1mb",      // 限制 參數資料大小
  parameterLimit : "10000" // 限制參數個數 
}));


//////////////////////////////////// 
// This is for swagger API documents.
const swaggerUi         = require('swagger-ui-express');
const YAML              = require('yamljs');
const swaggerDocument   = YAML.load('./api-docs/api-doc.yaml');

let options = {
    customCss: '.swagger-ui .wrapper { width: 80% }'
};

app.use(`/api-docs`,
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument,options)
);
//////////////////////////////////// 

app.get("/",(req,res)=>{
  res.send("這是 Node.js server , 查看 <a href='/api-docs'> members API 文件</a>");
})

app.use("/members",membersRouter);

app.use((req,res)=>{
  res.status(404).send("API 尚未開發！");
});


app.listen(portNum,()=>{
    console.log(`API server is running at localhost:${portNum}`);
});
