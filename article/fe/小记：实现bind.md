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

但由于ie6~ie8不支持该方法，所以若想在这几个浏览器中使用，我们就要模拟该方法，模拟的代码如下：

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

有一些不严谨，完整写法有待学习。
