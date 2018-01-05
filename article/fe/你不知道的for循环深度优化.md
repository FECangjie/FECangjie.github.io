---
createTime : 2017/12/31
author : 7nxo
title :  for循环优化
subtitle: javascript for循环从入门到偏门(效率优化+奇特用法)
---

# javascript for循环从入门到偏门(效率优化+奇特用法)

> for循环是非常基础的javascript知识，但由于JS太灵活了，所以可能出现一些让初学者崩溃的写法。我决定由浅入深的研究一下for循环。

首先，for循环的写法就略过吧。。。。

1. 条件写在循环条件里。

``` js
var ary = ["jack","tom","lily","andy"];
for(var i=0,a;a=ary[i++];){
console.log(a);
}
```

2. 缓存变量。

``` js
var arr =[1,2,23,...,1000];
for(var i=0,l = arr.length;i<l;i++) {
// do
}
```

3. 倒序法。（少用一个变量。。- - 这也可以）

``` js
var arr =[1,2,23,...,1000];
var i = arr.length;
for(;i>0;i--){
//alert(i);
}
```
