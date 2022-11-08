
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.1",
    "info": {
      "title": "回家試身手3 - RESTfulAPI 設計",
      "description": "本試題為「Node.js 後端網站架設實作坊」第三次回家練習題\n\n試題詳細說明請參考 <a href=\"\nhttps://reurl.cc/emeoeK\" target='_blank'>https://reurl.cc/emeoeK</a>\n\n請依照下方的 API 說明, 在 nodejs_express 上設計此 5 組 API\n\n<h3>(此為線上唯讀版 , 測試功能無法運作)</h3>\n",
      "version": "1.0.0"
    },
    "servers": [
      {
        "url": "http://localhost:8088"
      }
    ],
    "tags": [
      {
        "name": "members",
        "description": "會員資料"
      }
    ],
    "paths": {
      "/members/all": {
        "get": {
          "tags": [
            "members"
          ],
          "summary": "取得 全體 會員資料",
          "description": "當使用者發出 GET /members/all request 時 , 該 API 會回傳 **全體** 會員資料\n\n回傳資料格式 & 狀態碼 (status code)  如下\n",
          "responses": {
            "200": {
              "description": "<h2>正常回傳資料</h2>",
              "content": {
                "application/json": {
                  "examples": {
                    "ok1": {
                      "summary": "ok",
                      "value": {
                        "10001": {
                          "name": "Jeff",
                          "gender": "M",
                          "age": 18
                        },
                        "10002": {
                          "name": "Leo",
                          "gender": "M",
                          "age": 22
                        },
                        "10003": {
                          "name": "Jenny",
                          "gender": "F",
                          "age": 30
                        },
                        "10004": {
                          "name": "Holy",
                          "gender": "F",
                          "age": 31
                        },
                        "10005": {
                          "name": "Gina",
                          "gender": "F",
                          "age": 35
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/members/detail/{memNo}": {
        "get": {
          "tags": [
            "members"
          ],
          "summary": "取得 編號為 {memNo} 的會員資料",
          "description": "當使用者發出 GET /members/detail/{memNo} request 時 , 該 API 會回傳 **{memNo}** 所對應之會員資料\n\n需調整 status_code 做不同情況的回覆\n<h3>\n- 200 -> 正常回傳資料\n- 404 -> 查無資料\n- 500 -> Server 端發生錯誤 , 正常情況是不會發生 , 可能是有預期之外的 bug 出現\n</h3>\n\n---\nex1: **GET /members/detail/10001 ( 正常更新狀況 #1 )**\n```\n[response 200]:\n  {\n    \"name\": \"Jeff\",\n    \"gender\": \"M\",\n    \"age\": 18\n  }\n```\n\nex2: **GET /members/detail/10005 ( 正常更新狀況 #2 )**\n```\n[response 200]:\n  {\n    \"name\": \"Gina\",\n    \"gender\": \"F\",\n    \"age\": 35\n  }\n```\n\nex3: **GET /members/detail/12345 ( 查無資料之狀況 )**\n```\n[response 404]:\n  { \n    \"message\" : \"Not Found\" \n  }\n```\n\nex4: **GET /members/detail/10005 ( Server 端程式有誤 )**\n```\n[response 500]:\n  { \n    \"message\" : \"Server 端發生錯誤！\"\n  }\n```\n",
          "parameters": [
            {
              "in": "path",
              "name": "memNo",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "字串型數字",
              "example": 10001
            }
          ],
          "responses": {
            "200": {
              "description": "<h2>正常回傳資料</h2>",
              "content": {
                "application/json": {
                  "examples": {
                    "ok1": {
                      "summary": "ok (以 memNo=10001 為例)",
                      "value": {
                        "name": "Jeff",
                        "gender": "M",
                        "age": 18
                      }
                    },
                    "ok2": {
                      "summary": "ok (以 memNo=10005 為例)",
                      "value": {
                        "name": "Gina",
                        "gender": "F",
                        "age": 35
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "<h2>查無資料</h2>",
              "content": {
                "application/json": {
                  "examples": {
                    "failed": {
                      "summary": "failed (以 memNo=12345 為例)",
                      "value": {
                        "message": "Not Found"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "$ref": "#/components/responses/500ServerError"
            }
          }
        },
        "put": {
          "tags": [
            "members"
          ],
          "summary": "更新 編號為 {memNo} 的會員資料",
          "description": "當使用者發出 PUT /members/detail/{memNo} request 時 , 該 API 會更新 **{memNo}** 所對應之會員資料\n\n\n需調整 status_code 做不同情況的回覆\n<h3>\n- 200 -> 更新資料ok 且 回傳 { \n    \"message\"      : \"ok\" , \n    \"affectedRows\" : 1 \n  }\n- 400 -> 當傳過去的 req.body 沒有 name or gender or age 時，回傳錯誤 400\n- 404 -> 查無資料 , 僅回傳  { \n    \"message\"      : \"Not Found\" , \n    \"affectedRows\" : 0\n  } 即可\n- 500 -> Server 端發生錯誤\n</h3>\n\n<h3>【註】：</h3>\n \n<h3>\n1. 本組 API 需特別檢查 req.body 是否有帶齊 name , gender , age 三個欄位的資料\n\n   有缺失 -> 回傳 400 之錯誤 response\n2. 更新完後 , 可嘗試發  GET /members/all  檢查資料是否有 修改 資料成功 !\n</h3>\n---\nex1: **PUT /members/detail/10001  ( 正常更新狀況 #1 )** \n```\n[payload]:\n  {\n    \"name\": \"傑夫老師\",\n    \"gender\": \"M\",\n    \"age\": 18\n  }\n  \n[response 200]:\n  { \n    \"message\"      : \"ok\" , \n    \"affectedRows\" : 1 \n  }\n```\n\nex2: **PUT /members/detail/10004  ( 正常更新狀況 #2 )**\n```\n[payload]:\n  {\n    \"name\": \"多拉Ａ夢\",\n    \"gender\": \"F\",\n    \"age\": 100\n  }\n  \n[response 200]:\n  { \n    \"message\"      : \"ok\" , \n    \"affectedRows\" : 1 \n  }\n```\n\nex3: **PUT /members/detail/12345  ( req.body 有誤之狀況 )**\n```\n[payload]:\n  {\n    \"name\": \"測試人\",\n    \"gender\": \"F\"\n  }\n  \n[response 400]:\n  { \n    \"message\": \"req.body 的資料格式有誤！\"\n  }\n```\n\nex4: **PUT /members/detail/12345  ( 查無資料之狀況 )**\n```\n[payload]:\n  {\n    \"name\": \"測試人\",\n    \"gender\": \"F\",\n    \"age\": 20\n  }\n  \n[response 404]:\n  { \n    \"message\"      : \"Not Found\" , \n    \"affectedRows\" : 0\n  }\n```\n",
          "parameters": [
            {
              "in": "path",
              "name": "memNo",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "字串型數字",
              "example": 10001
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "姓名",
                      "example": "Jeff"
                    },
                    "gender": {
                      "type": "string",
                      "description": "性別",
                      "example": "M"
                    },
                    "age": {
                      "type": "number",
                      "description": "年紀",
                      "example": 18
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "<h2>正常更新資料</h2>",
              "content": {
                "application/json": {
                  "examples": {
                    "ok1": {
                      "summary": "ok (成功更新資料)",
                      "value": {
                        "message": "ok",
                        "affectedRows": 1
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/400BadPayload"
            },
            "404": {
              "$ref": "#/components/responses/404NotFound"
            },
            "500": {
              "$ref": "#/components/responses/500ServerError"
            }
          }
        }
      },
      "/members": {
        "post": {
          "tags": [
            "members"
          ],
          "summary": "新增 會員資料",
          "description": "當使用者發出 POST /members request 時 , 該 API 新增一組會員資料\n\n其中 memNo 需由 server 端統一編製 , \n以 **memNo 最大的數字+1** , 作為新資料的 memNo\n\nex1:\n\n檢查資料 , 若目前最大的 **memNo=10005**, 則新資料為 **memNo=10006**\n\nex2:\n\n檢查資料 , 若目前資料有 \"10001\",\"10002\",\"10007\",\"10009\" 四組資料\n\n最大的 **memNo=10009**, 則新資料為 **memNo=10010**\n\n---\n\n\n需調整 status_code 做不同情況的回覆\n<h3>\n- 200 -> 新增資料 ok, 回傳之 response 需攜帶新的 memNo\n- 400 -> 當傳過去的 req.body 沒有 name or gender or age 時，回傳錯誤 400\n- 500 -> Server 端發生錯誤\n</h3>\n\n<h3>【註】：</h3>\n \n<h3>\n1. 本組 API 需特別檢查 req.body 是否有帶齊 name , gender , age 三個欄位的資料\n\n   有缺失 -> 回傳 400 之錯誤 response\n2. 新增完後 , 可嘗試發  GET /members/all  檢查資料是否有 新增 資料成功 !\n</h3>\n---\nex1: **POST /members  ( 正常更新狀況 #1 )** \n```\n[payload]:\n  {\n    \"name\": \"阿夫老師\",\n    \"gender\": \"M\",\n    \"age\": 38\n  }\n  \n[response 200]:\n  { \n    \"message\" : \"ok\",\n    \"memNo\"   : \"10012\"\n  }\n```\n\nex2: **POST /members  ( 正常更新狀況 #2 )**\n```\n[payload]:\n  {\n    \"name\": \"QQ助教\",\n    \"gender\": \"F\",\n    \"age\": 31\n  }\n  \n[response 200]:\n  { \n    \"message\" : \"ok\",\n    \"memNo\"   : \"10013\"\n  }\n``` \n\nex3: **POST /members  ( req.body 有誤之狀況 )**\n```\n[payload]:\n  {\n    \"name\": \"測試人\",\n    \"gender\": \"F\"\n  }\n  \n[response 400]:\n  { \n    \"message\": \"req.body 的資料格式有誤！\"\n  }\n```\n",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "姓名",
                      "example": "Jeff"
                    },
                    "gender": {
                      "type": "string",
                      "description": "性別",
                      "example": "M"
                    },
                    "age": {
                      "type": "number",
                      "description": "年紀",
                      "example": 18
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "<h2>正常新增資料</h2>",
              "content": {
                "application/json": {
                  "examples": {
                    "ok1": {
                      "summary": "ok (成功新增資料)",
                      "value": {
                        "message": "ok",
                        "memNo": "10012"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/400BadPayload"
            },
            "500": {
              "$ref": "#/components/responses/500ServerError"
            }
          }
        },
        "delete": {
          "tags": [
            "members"
          ],
          "summary": "刪除 特定的會員資料",
          "description": "當使用者發出 DELETE /members?memNo={memNo} request 時 , 該 API 會刪除 **{memNo}** 所對應之會員資料\n\n\n需調整 status_code 做不同情況的回覆\n<h3>\n- 200 -> 刪除資料 且 回傳 { \n    \"message\"      : \"ok\" , \n    \"affectedRows\" : 1 \n  }\n- 404 -> 查無資料 , 回傳  { \n    \"message\"      : \"Not Found\" , \n    \"affectedRows\" : 0\n  } 即可\n- 500 -> Server 端發生錯誤\n</h3>\n\n<h3>【註】：</h3>\n \n<h3>\n1. 本組 API , 使用 query_string 的方式攜帶 memNo 參數\n2. 刪除完後 , 可嘗試發  GET /members/all  檢查資料是否有 刪除 資料成功 !\n</h3>\n---\nex1: **DELETE /members?memNo=10001  ( 正常刪除狀況 #1 )** \n```\n[response 200]:\n  { \n    \"message\" : \"ok\",\n    \"affectedRows\" : 1 \n  }\n```\n\nex2: **DELETE /members?memNo=10005  ( 正常更新狀況 #2 )**\n```\n[response 200]:\n  { \n    \"message\" : \"ok\",\n    \"affectedRows\" : 1 \n  }\n```\n\nex3: **POST /members?memNo=33333  ( 查無資料 )**\n```\n[response 404]:\n  { \n    \"message\" : \"Not Found\", \n    \"affectedRows\" : 0\n  }\n```\n",
          "parameters": [
            {
              "in": "query",
              "name": "memNo",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "字串型數字",
              "example": 10001
            }
          ],
          "responses": {
            "200": {
              "description": "<h2>正常刪除資料</h2>",
              "content": {
                "application/json": {
                  "examples": {
                    "ok1": {
                      "summary": "ok (成功刪除資料)",
                      "value": {
                        "message": "ok",
                        "affectedRows": 1
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "$ref": "#/components/responses/404NotFound"
            },
            "500": {
              "$ref": "#/components/responses/500ServerError"
            }
          }
        }
      }
    },
    "components": {
      "responses": {
        "200MessageOk": {
          "description": "successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string",
                    "example": "ok"
                  }
                }
              }
            }
          }
        },
        "400BadPayload": {
          "description": "<h2>req.body 的資料格式有誤</h2>",
          "content": {
            "application/json": {
              "examples": {
                "failed": {
                  "summary": "failed",
                  "value": {
                    "message": "req.body 的資料格式有誤！"
                  }
                }
              }
            }
          }
        },
        "404NotFound": {
          "description": "<h2>查無資料</h2>",
          "content": {
            "application/json": {
              "examples": {
                "failed": {
                  "summary": "failed",
                  "value": {
                    "message": "Not Found",
                    "affectedRows": 0
                  }
                }
              }
            }
          }
        },
        "500ServerError": {
          "description": "<h2>Server 端發生錯誤</h2>",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string",
                    "example": "Server 端發生錯誤！"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
