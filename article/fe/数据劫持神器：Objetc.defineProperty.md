---
createTime : 2017/12/28
author : 7nxo
title :  数据劫持神器：Object.defineProperty
subtitle: 不会Object.defineProperty你就out了
---

# 数据劫持神器：Object.defineProperty

> 本文作者：IMWeb coverguo 原文出处：IMWeb社区 未经同意，禁止转载

Object.defineProperty ，顾名思义，为对象定义属性。在js中我们可以通过下面这几种方法定义属性

``` js
// (1) define someOne property name
someOne.name = 'cover';
//or use (2)
someOne['name'] = 'cover';
// or use (3) defineProperty
Object.defineProperty(someOne, 'name', {
    value : 'cover'
})
```
从上面看，貌似使用Object.defineProperty很麻烦，那为啥存在这样的方法呢？

我们可以通过Object.defineProperty这个方法，直接在一个对象上定义一个新的属性，或者是修改已存在的属性。最终这个方法会返回该对象。

## 语法

Object.defineProperty(object, propertyname, descriptor)

## 参数

- object 必需。 要在其上添加或修改属性的对象。 这可能是一个本机 JavaScript对象（即用户定义的对象或内置对象）或 DOM 对象。
- propertyname 必需。 一个包含属性名称的字符串。
- descriptor 必需。 属性描述符。 它可以针对数据属性或访问器属性。

其中descriptor的参数值得我们关注下,该属性可设置的值有：

-【value】 属性的值，默认为 undefined。
-【writable】 该属性是否可写，如果设置成 false，则任何对该属性改写的操作都无效（但不会报错），对于像前面例子中直接在对象上定义的属性，这个属性该特性默认值为为 true。


``` js
var someOne = { };
Object.defineProperty(someOne, "name", {
    value:"coverguo" , //由于设定了writable属性为false 导致这个量不可以修改
    writable: false
});  
console.log(someOne.name); // 输出 coverguo
someOne.name = "linkzhu";
console.log(someOne.name); // 输出coverguo
```

-【configurable]】如果为false，则任何尝试删除目标属性或修改属性以下特性（writable, configurable, enumerable）的行为将被无效化，对于像前面例子中直接在对象上定义的属性，这个属性该特性默认值为为 true。 。

-【enumerable】 是否能在for-in循环中遍历出来或在Object.keys中列举出来。对于像前面例子中直接在对象上定义的属性，这个属性该特性默认值为为 true。

-【get】一旦目标对象访问该属性，就会调用这个方法，并返回结果。默认为 undefined。
-【set】 一旦目标对象设置该属性，就会调用这个方法。默认为 undefined。
