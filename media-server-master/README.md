# media-server

多媒體機畫面設定(廣告、金額等)

## 架構說明

lcd-server(多媒體機畫面)

* 車道訊息推複數多媒體機，media-server在本地端(ex:多媒體機樹梅派)

```text
   cbox -> 主機車道訊息接收server -> 
                                     本地端lcd-server
              本地端media-server ->
```

* 車道訊息推複數多媒體機，media-server在主機端
  
```text
               cbox ->  
                         主機車道訊息接收server ->(含media資訊) 本地端lcd-server
   主機media-server ->           
```

* 車道訊息推單一，media-server在本地端(cbox直接推送)

```text
   cbox -> 本地端media-server(需啟用lane) -> 本地端lcd-server
```

## 打包exe檔

全域安裝pkg

```bash
npm install -g pkg
```

打包

```bash
pkg server.js
```
