# 回家試身手2 - router 設計 - 作業解答
## 題目描述

1. 試設計 **2個 router**, 程式分別為 
    - router/hello.js
    - router/introduction.js 

2. 兩組 router 內分別設計 API

    **1) hello.js**
    - GET /hello/greeting          => 網頁顯示 "Hello World!"
    - GET /hello/?name={your_name} => 網頁顯示 "Hello ,  {name} ! Welcome to the Node.js ~~~. "
        
    **2) introduction.js**
    - GET /introduction/page => 網頁顯示 "這是 introduction 頁面"
    - GET /introduction/data => 讀取 data.json 內的資料並回傳 , 結果為
    ```
        {
            result : [
                { "Name": "Jeff" , "EmpNo": "001", "Age": 18 },
                { "Name": "Leo"  , "EmpNo": "002", "Age": 24 },
                { "Name": "Keven", "EmpNo": "003", "Age": 26 },
                { "Name": "Holy" , "EmpNo": "004", "Age": 18 },
                { "Name": "Jenny", "EmpNo": "005", "Age": 33 }
            ]
        }
    ```
    - GET /introduction/data/:EmpNo => 透過 EmpNo 取得對應的資料
    ex: 
    ```
        GET /introduction/data/005  , 回傳 { "Name": "Jenny", "EmpNo": "005", "Age": 33 }
        GET /introduction/data/002  , 回傳 { "Name": "Leo"  , "EmpNo": "002", "Age": 24 }
        GET /introduction/data/1234 , 回傳 {}
    ```
                
3. 補充說明 
    1) 資料夾結構應為
        - server.js
        - package.json
        - data.json
        - router/
          - hello.js
          - introduction.js
    2) 本試題為練習拆分成 router , 故 server.js 僅能遵守 ```app.use(...)``` 的用法

       切勿將 ```app.get("/hello/greeting",...)``` 等相關程式碼 , 寫在 server.js 上
    3) 解答將於 **週三** 公佈於 [mentorJe！傑夫尬程式](https://reurl.cc/kL6bLK) 的頻道上
