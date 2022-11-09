# 回家試身手3 - RESTful API 設計

1. 建立 **1個 router**, 程式為 
    - router/members.js

2. 在 members.js 內分別設計 **5個 API**

   API 的相關說明 , 請依照下列動作 , 執行好 express server

    1) 複製該資料夾 , 並執行 ``` npm install ``` 安裝所需套件
    2) 執行 ``` node server.js ``` 

   即可從 http://localhost:8088 看到 API 說明文件, 相關資料放在 **data.json** 中 
        
   亦可參考線上版 [Swagger.io 文件](https://reurl.cc/OEp7py)

3. 補充說明 
    1) 資料夾結構應為
        - server.js
        - package.json
        - data.json
        - router/
          - members.js
        - api-docs  ( API 文件 , 無須更動)

    2) 本試題為閱讀 Swagger API 文件 , 設計五組 /members 相關的 API 並測試 , 確保功能正常。 

       <h3>目的： 讓使用者可透過這些 API , 進而修改 data.json 的資料</h3>
       
    3) 解答於 [宇先程式](https://youtube.com/@yuhsuanCode) 的頻道上

---

4. 反思區
    1) 功能重複的 function , 是否有更好的 程式設計架構？
    2) API 文件的 出現契機 & 情境？
    3) 反覆操作 data.json 是好的做法嗎？