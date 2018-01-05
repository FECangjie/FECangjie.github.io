---
createTime : 2017/12/26
author : 7nxo
title :  Bind
subtitle: 巩固根基
---

# 详解call，apply 和 bind

> 之前看了点es6的箭头函数，为了搞懂箭头函数的this，看了很多文章，也顺便看了几个绑定函数，发现很多以前没注意的问题，收获不少。

call()和apply()就是改变函数的执行上下文，也就是this值。他们两个是Function对象的方法，每个函数都能调用。他们的第一个参数就是你要指定的执行上下文，第二个用来传递参数(说第二个不准确，应该说第二部分，因为参数可以传多个)，也就是传给调用call和apply方法的函数的参数。说白了，就是调用函数，但是让它在你指定的上下文下执行，这样，函数可以访问的作用域就会改变。下面看点代码：

``` js
function apply1(num1, num2){
  return sum.apply(this, [num1, num2]);
}
function call1(num1, num2){
  return sum.call(this, num1, num2);
}
```

这里，我们执行环境传的是this，也就是说没改变函数的执行上下文。这两段代码，只是想告诉你call和apply的区别。

call的第二部分参数要一个一个传，apply要把这些参数放到数组中。这就是他们的区别，真的就这么点区别！！！

然后，不得不说的一点：它们的第二个参数都可以传arguments。

## Bind

bind()是es5中的方法，他也是用来实现上下文绑定，看它的函数名就知道。bind()和call与apply不同。bind是新创建一个函数，然后把它的上下文绑定到bind()括号中的参数上，然后将它返回。

所以，bind后函数不会执行，而只是返回一个改变了上下文的函数副本，而call和apply是直接执行函数。

下面代码可以反映出这点，而且也显示了bind的用法（后面的代码皆取自张鑫旭大神的博客）

``` js
var button = document.getElementById("button"),
    text = document.getElementById("text");
button.onclick = function() {
    alert(this.id); // 弹出text
}.bind(text);
```

但由于ie6~ie8不支持该方法，所以若想在这几个浏览器中使用，我们就要模拟该方法，模拟的代码如下：（已考虑到柯里化）

``` js
if (!function() {}.bind) {
    Function.prototype.bind = function(context) {
        var self = this
            , args = Array.prototype.slice.call(arguments);

        return function() {
            return self.apply(context, args.slice(1));    
        }
    };
}
```

首先，判断是否存在bind方法，然后，若不存在，向Function对象的原型中添加自定义的bind方法。

这里面var self = this这段代码让我很困扰，一个误区就是，prototype是一个对象，对象的this应该指向对象本身，也就是prototype。但其实，原型中的this值指向调用它的对象。（写个demo就明了了）

如此，我们自己的这个bind函数的行为就同es5中的bind一样了。

有一些不严谨，完整模拟写法有待学习。比如bind可作为构造函数的实现（可参考 https://segmentfault.com/a/1190000002662251）

``` js
if (!function() {}.bind) {
  Function.prototype.bind = function(context){
    var args = Array.prototype.slice(arguments, 1),
    F = function(){},
    self = this,
    bound = function(){
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return self.apply((this instanceof F ? this : context), finalArgs);
    };

    F.prototype = self.prototype;
    bound.prototype = new F();
    retrun bound;
  };
}
```


## 补充

### 函数柯里化

柯里化3个常见作用：1. 参数复用；2. 提前返回；3. 延迟计算/运行。

1. “参数复用”：通过柯里化过程，getWife()无需添加这个多余的“合法老婆”参数。

``` js
var currying = function(fn) {
    // fn 指官员消化老婆的手段
    var args = [].slice.call(arguments, 1);
    // args 指的是那个合法老婆
    return function() {
        // 已经有的老婆和新搞定的老婆们合成一体，方便控制
        var newArgs = args.concat([].slice.call(arguments));
        // 这些老婆们用 fn 这个手段消化利用，完成韦小宝前辈的壮举并返回
        return fn.apply(null, newArgs);
    };
};

// 下为官员如何搞定7个老婆的测试
// 获得合法老婆
var getWife = currying(function() {
    var allWife = [].slice.call(arguments);
    // allwife 就是所有的老婆的，包括暗渡陈仓进来的老婆
    console.log(allWife.join(";"));
}, "合法老婆");

// 获得其他6个老婆
getWife("大老婆","小老婆","俏老婆","刁蛮老婆","乖老婆","送上门老婆");

// 换一批老婆
getWife("超越韦小宝的老婆");
```

2. “提前返回”：兼容现代浏览器以及IE浏览器的事件添加方法。

``` js
var addEvent = function(el, type, fn, capture) {
    if (window.addEventListener) {
        el.addEventListener(type, function(e) {
            fn.call(el, e);
        }, capture);
    } else if (window.attachEvent) {
        el.attachEvent("on" + type, function(e) {
            fn.call(el, e);
        });
    }
};

// 柯里化如下
var addEvent = (function(){
    if (window.addEventListener) {
        return function(el, sType, fn, capture) {
            el.addEventListener(sType, function(e) {
                fn.call(el, e);
            }, (capture));
        };
    } else if (window.attachEvent) {
        return function(el, sType, fn, capture) {
            el.attachEvent("on" + sType, function(e) {
                fn.call(el, e);
            });
        };
    }
})();
```

3. “延迟计算”，一般而言，延迟计算或运行是没有必要的，因为一天花10块钱和月末花300块钱没什么本质区别——只是心里好受点（温水炖青蛙）。嘛，毕竟只是个人看法，您可能会不这么认为。举个例子，我每周末都要去钓鱼，我想知道我12月份4个周末总共钓了几斤鱼，把一些所谓的模式、概念抛开，我们可能就会下面这样实现：
（虽然延迟计算听上去很高级，但是，没有哪种情况非要柯里化延迟计算实现才能显著提高性能。。）

``` js
var curryWeight = function(fn) {
    var _fishWeight = [];
    return function() {
        if (arguments.length === 0) {
            return fn.apply(null, _fishWeight);
        } else {
            _fishWeight = _fishWeight.concat([].slice.call(arguments));
        }
    }
};
var fishWeight = 0;
var addWeight = curryWeight(function() {
    var i=0; len = arguments.length;
    for (i; i<len; i+=1) {
        fishWeight += arguments[i];
    }
});

addWeight(2.3);
addWeight(6.5);
addWeight(1.2);
addWeight(2.5);
addWeight();    //  这里才计算

console.log(fishWeight);    // 12.5
```
