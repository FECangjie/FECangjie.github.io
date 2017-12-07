---
createTime : 2017/07/16
author : Wei Lin
title : DOM总结
subtitle: 总结DOM常用方法及事件模型
---


## DOM总结


### BOM

BOM浏览器对象模型（Browser Object Model）BOM对象是在Web中使用JavaScript的核心，该对象提供了与浏览器交互相关对象结构。BOM由多个子对象组成，其核心为window对象，它是BOM的顶层对象，表示在浏览器环境中的一个全局的顶级对象，所有在浏览器环境中使用的对象都是window对象的子对象。

>早期是没有BOM标准的，浏览器实现各不相同，直到h5规范中，W3C才把部分BOM的接口比如location和history纳入h5规范中

#### 1. 浏览器对象模型

 ![image](https://github.com/linwei0201/Notes/blob/master/DOM&BOM/img/bom.png)

#### 2. bom中的对象

##### 2.1 window

window对象对象表示一个浏览器窗口或一个frame框架，它处于对象层次的最顶端，提供了处理浏览器窗口的方法和属性。js中的内置对象也是作为window的属性和方法出现的，浏览器环境中全局VO（变量对象）就是window，因此window上的属性和方法的作用域都是全局的。

- 全局方法
  - 窗口操作
    - open, close
    - focus, blur
    - moveBy, moveTo
    - scrollBy, scrollTo
    - resizeBy, resizeTo
  - 弹窗类 alert， confirm， ~~prompt~~

  ```js
    alert("我是一个弹窗"); //浏览器弹出一个弹窗

    if(confirm("确认提交不后悔吗")){
      //确认操作
    }else{
      //取消，需要再思考下
    }

    //prompt因为用户体验不友好，一般选择自己设计Modal
    var pwd = prompt("请输入6位数银行卡密码");

  ```

  - 定时器类
    - setTimeout，clearTimeout
    - setInterval，clearInterval
    - requestAnimationFrame

  ```js
    setTimeout(function(){
      //1s后放到消息队列
    }, 1000);

    setInterval(function(){
      //每隔1s加到消息队列一次,如果回调已存在，不会重复添加
    }, 1000);

  ```

  > 根据显示器的频率的不同，浏览器重绘页面的时间间隔也是会改变的，比如屏幕60HZ，1000/60=16.67ms刷新一次页面，requestAnimationFrame是浏览器自身提供的接口，会根据显示器频率变化，来改变刷新时间，不会出现掉帧的现象。一般js动画建议用requestAnimationFrame

  - 编解码
    - ~~escape, unescape： 除了ASCII 字母和数字，和  - _ . ! ~ * ' ( ) 这些标点符号，其他都会被编码~~
    - encodeURI, decodeURI： 除了以上那些和uri上回出现的特殊符号，都会编码
    - encodeURIComponent, decodeURIComponent：所有uri的特殊符号，都会被编码

  ```js
    escape("http://bj.lianjia.com")     //返回http%3A//bj.lianjia.com
    encodeURI("http://bj.lianjia.com")  //返回http://bj.lianjia.com
    encodeURI("http://bj.lianjia.com/xiao qu")  //返回http://bj.lianjia.com/xiao%20qu
    encodeURIComponent("http://bj.lianjia.com") //返回http%3A%2F%2Fbj.lianjia.com
  ```

  > escape在编码unicode大于0xff字符的方式，不太规范，所以已经弃用


  - 类型转换
    - parseInt, parseFloat
  - eval
  - 类型判定 isFinite, isNaN

##### 2.2 frames对象
frames对象是一个集合，表示当前页面中使用的子框架。如果页面中使用了框架，将产生一个框架集合frames，在集合中可以用数字下标（从0开始）或名字索引框架。集合中的每一个对象，包含了框架的页面布局信息，以及每一个框架所对应的window对象。
  - frames属性会以集合的方式返回当前窗口中包含的框架。

  ```js
  frameList = window.frames;
  ```
  - frameList是一个frame对象的列表。它的类似于数组，有length属性且可以通过[i]的形式访问。
  - top parent 与self
##### 2.3 navigator对象

navigator中常用的属性是userAgent,常用它来检测用户代理。但是浏览器兼容，还是推荐用能力检测的方式。

[这里](http://fex-team.github.io/ua-device/demo.html) 有一个在线模拟和检测用户代理的地址

```js
//ua检测
function whichEngine(){
  var ua = navigator.userAgent;
  if(/Trident/.test(ua)){
    alert("Trident");
  }else if(/Webkit/.test(ua)){
    alert("Webkit");
  }else if(/Gecko/.test(ua)){
    alert("Gecko");
  }
}

```

##### 2.4 history对象
history对象来保存浏览器历史记录信息，也就是用户访问的页面。浏览器的前进与后退功能本质上就是history的操作。history对象记录了用户浏览过的页面，通过该对象提供的API可以实现与浏览器前进/后退类似的导航功能。

##### 2.5 location对象
window对像的location属性引用的是Location对象，它表示当前页面文档的URL。Location对象包括：hash 、host、hostname、origin 、port、pathname、protocal、search属性，及：assign、replace、reload方法。获取URL中的各种参数（如：querystring参数、锚点、网址等）都要使用此对象。

打印bj.lianjia.com页面的location信息如下所示
![image](https://github.com/linwei0201/Notes/blob/master/DOM&BOM/img/location.png)

| 属性 | 说明 |
| ------| ------ |
| hash | URL的锚点内容，即："#"（第一个）之后的内容  |
| host | 主机名（域名）＋端口号  |
| hostname | 主机名 |
| origin | 协议+主机名+端口   （IE不支持） |
| port | 端口号 |
| pathname | 主机名后的部分 |
| protocol | 协议 |
| search | 查询字符串 即：“?”（第一个）及其后的部分 |


##### 2.6 screen对象

IE、Safari、Opera和Chrome都提供了用来确定和修改window对象位置的属性和方法:screenLeft和screenTop属性，分别用于表示窗口相对于屏幕左边和上边的位置。Firefox则在screenX和screenY属性中提供相同的窗口位置信息,Safari和Chrome也同时支持这两个属性。使用下列代码可以跨浏览器取得窗口左边和上边的位置。

```js
var left = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;
var top = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;
```



### DOM

#### 3.1 DOM历史

DOM的发展大概历经了以下五个阶段：
- DOM0（1997.06-1997.10）：网景和IE发布了第四版浏览器，对js做了大量支持，推行DHTML，但二者实现方式大相径庭，js标准开始变得混乱

- DOM1（1998年10月 ）：W3C推行DOM标准，包含DOM Core（DOM核心）和DOM HTML

- DOM2（2000年11月）：DOM视图、DOM事件、DOM样式、DOM遍历和范围（DOM Traversal and Range）

- DOM3（2004年4月 ）：DOM加载和保存模块、DOM验证模块、DOM核心的扩展

- DOM4（2015年11月）：增加Mutation Observers，作为原来 Mutation Events的替代

这是DOM2时代DOM的架构图：
![image](https://github.com/linwei0201/Notes/blob/master/DOM&BOM/img/dom2.png)


#### 3.2 DOM基础

DOM是Document Object Model的简写，是浏览器提供的一个对象模型，用来操作浏览器的文档树。

- DOM的增删改查

  ![image](https://github.com/linwei0201/Notes/blob/master/DOM&BOM/img/DOM-op.png)

  - 新增DOM节点
  - 查询DOM节点
  - 修改DOM节点
  - 删除DOM节点

  ```js
      var box = document.getElementById("box");

      //创建节点
      var ele = document.creatElement("div");
      ele.innerText = "我是新节点的内容";
      ele = box.appendChild(ele);

      ele.textContent="修改一下节点内容";

      //删除
      ele.remove();
  ```

#### 3.3 DOM事件

- 事件流

  关于事件流，浏览器有两套不同的实现方案。早期的IE提出的事件模型是冒泡模型，开发人员认为事件是由最确定的节点开始触发，一直传播到文档的根节点为止，如下图所示。
  ![image](https://github.com/linwei0201/Notes/blob/master/DOM&BOM/img/event1.png)

  Netscape提出了完全相反的事件模型，事件捕获模型，他们认为事件应该都有根节点开始触发，一直传播到最确定的元素为止，如下图所示。
  ![image](https://github.com/linwei0201/Notes/blob/master/DOM&BOM/img/event2.png)

  DOM2中，规定，DOM事件流有3个阶段：捕获阶段，目标阶段和冒泡阶段，W3C的标准事件模型，如下图所示。
  ![image](https://github.com/linwei0201/Notes/blob/master/DOM&BOM/img/event3.png)

- 事件绑定与解除

- 事件对象

- 事件类型

![image](https://github.com/linwei0201/Notes/blob/master/DOM&BOM/img/event-type.png)

- 事件代理
