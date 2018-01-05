---
createTime : 2017/12/31
author : 7nxo
title :  for循环优化
subtitle: javascript for循环从入门到偏门(效率优化+奇特用法)
---

# javascript for循环从入门到偏门(效率优化+奇特用法)

> for循环是非常基础的javascript知识，但由于JS太灵活了，所以可能出现一些让初学者崩溃的写法。我决定由浅入深的研究一下for循环。

首先，for循环的写法就略过吧。。。。
以下测试为在chrome中测试。

我们以一个常规写法为例子

``` js
var date1 = new Date();
var arr = new Array(10000000);
for (var i=0;i<arr.length;i++) {
  var n = new Array()
// do
}
var date2 = new Date();
console.log(date2 - date1)
```
539s

1. 条件写在循环条件里。（优化有奇效）

``` js
var date1 = new Date();
var arr = new Array(10000000);
for (var i=0,a;a=arr[i++];) {
  var n = new Array()
// do
}
var date2 = new Date();
console.log(date2 - date1)
```
56s

2. 缓存变量。（不太稳定，和arr有关）

``` js
var date1 = new Date();
var arr = new Array(10000000);
for (var i=0, len = arr.length;i<len;i++) {
  var n = new Array()
// do
}
var date2 = new Date();
console.log(date2 - date1)
```
511s

3. 不在循环里声明变量。

``` js
var date1 = new Date();
var arr = new Array(10000000);
for (var i=0,n = new Array();i<arr.length;i++) {
// do
}
var date2 = new Date();
console.log(date2 - date1)
```
115s

4. 倒序法。（- - 这也可以优化）

``` js
var date1 = new Date();
var arr = new Array(10000000);
for (var i=arr.length;i>0;i--) {
  var n = new Array()
// do
}
var date2 = new Date();
console.log(date2 - date1)
```
486s

5. 注意跳出

不进行不必要的操作，这是基本逻辑。如有1000个li里面，有一个li上有个特殊的className，我们要找出这个li。那么，由于已经确定只有一个这样的li，我们找到这个li就应该马上跳出，break,下面的循环就没必要进行了。这样一来，由于li有999/1000的几率不是最后一个，我们肯定能节约不少计算。
其他情况请举一反三。


## 总结：

JS的for循环中，`性能的优化主要通过减少循环体中变量的声明和外部方法的调用来实现`。例子3中所讲的判断语句的优化其实也是对循环体中外部方法调用的优化。我在写后台时，遇到过在for循环中写SQL的例子，每次循环都访问一次数据库，这个效率是极低的
