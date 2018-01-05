---
createTime : 2018/01/05
author : 7nxo
title : JSONP 原理
subtitle: JSONP 原理
---

# JSONP 原理

写个API调用吧。。。

``` js
cbName () => {}

function getJson (cbName, url){
  var src = url + "?callback=" + cbName;
  var obj = $('<script><\/script>');
  obj.attr("src", src);
  $("body").append(obj);
}
```
