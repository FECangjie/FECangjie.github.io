---
createTime : 2017/11/19
author : 7nxo
title : decorator
subtitle: decorator装饰器
---

#decorator

js的decorator是借鉴的pythod的decorator的思想。主要作用是给一个已有的方法或类扩展一些新的行为，而不是去直接修改它本身。

想象一下用过的decorator， css-modules，antd的form校验，redux的connect也可以写成decorator方式

```
class CustomizedForm extends React.Component {}

CustomizedForm = Form.create({})(CustomizedForm);


//等同于
@Form.create({})
class CustomizedForm extends React.Component {}
```

在 ES6 之前，装饰器对于 JS 来说确实显得不太重要，你只是需要加几层 wrapper 包裹就好了（虽然也会显得不那么优雅）。但是正如文章开头所说，在 ES6 提出之后，你会发现，好像事情变得有些不同了。当我们需要在多个不同的类之间共享或者扩展一些方法或行为的时候，代码会变得错综复杂，极其不优雅，这也就是装饰器被提出的一个很重要的原因。


## decorator有什么好处

- 高阶函数语法糖，更容易理解
- 修饰类与属性，不破坏内部代码的基础上，扩展新的功能
- 有类似注释的功能，autobind， readonly，testable一目了然


## class及其属性

在es6中定义一个类，代码如下

```
class Cat {
    say() {
        console.log("meow ~");
    }
}
```

上面这段代码是 ES6 中定义一个类的写法，其实只是一个语法糖，而实际上当我们给一个类添加一个属性的时候，会调用到 Object.defineProperty 这个方法，它会接受三个参数：target 、name 和 descriptor ，所以上面的代码实际上在执行时是这样的：

```
function Cat() {}
Object.defineProperty(Cat.prototype, "say", {
    value: function() { console.log("meow ~"); },
    enumerable: false,
    configurable: true,
    writable: true
});
```

## 用法

### 修饰类

作用于类的装饰器，其实装饰器也是一个函数，作用于类时，第一个形参是类本身

```
function isAnimal(target) {
    target.isAnimal = true;
    return target;
}

@isAnimal
class Cat {
    ...
}
console.log(Cat.isAnimal);    // true



//等同于
Cat = isAnimal(function Cat() { ... });

```


### 修饰类的属性

当装饰器作用于类本身的时候，我们操作的对象也是这个类本身，而当装饰器作用于类的某个具体的属性的时候，我们操作的对象既不是类本身，也不是类的属性，而是它的描述符（descriptor），而描述符里记录着我们对这个属性的全部信息，所以，我们可以对它自由的进行扩展和封装，最后达到的目的呢，就和之前说过的装饰器的作用是一样的。

```
function readonly(target, name, descriptor) {
    discriptor.writable = false;
    return discriptor;
}

class Cat {
    @readonly
    say() {
        console.log("meow ~");
    }
}
var kitty = new Cat();
kitty.say = function() {
    console.log("woof !");
}
kitty.say()    // meow ~
```

以上代码等价于

```
let descriptor = {
    value: function() {
        console.log("meow ~");
    },
    enumerable: false,
    configurable: true,
    writable: true
};
descriptor = readonly(Cat.prototype, "say", descriptor) || descriptor;
Object.defineProperty(Cat.prototype, "say", descriptor);
```

> 💡思考：怎么补全下列代码，可以实现，在调用Math类的add方法，可以输出打印输入和输出。

```
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}
```


```
class Math {

    @log
  add(a, b){
    return a+b;
  }
}

function log(target, name, descriptor){
  var old = descriptor.value;

  descriptor.value = function(){
    var result = old.apply(null, arguments);
    console.log(`input : ${[...arguments]}, output: ${result}`);
    return result;
  }

  return descriptor;
}

var math = new Math();
math.add(1, 2);
```


## 有多个修饰器的情况

```
function dec(id){
  console.log('evaluated', id);
  return (target, property, descriptor) => console.log('executed', id);
}

class Example {
    @dec(1)
    @dec(2)
    method(){}
}
```

相当于

```




Object.defineProperty(Example.prototype, method, dec2)
```


## 为什么不能修饰函数

```
var counter = 0;

var add = function () {
  counter++;
};

@add
function foo() {
}
```

等价于

```
@add
function foo(){

}

var counter ;
var add;


add = function () {
  counter++;
};

```


## 实用场景

### mixins

```
// mixins.js
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}

// main.js
import { mixins } from './mixins'

const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // 'foo'
```

###


## 第三方类库

[core-decorator](https://github.com/jayphelps/core-decorators)

  - autobind
  - readonly
  - override
  - deprecated
  - suppressWarnings




## 兼容性

现在装饰器因为还在草案阶段，所以还没有被大部分环境支持，如果要用的话，需要使用 Babel 进行转码，需要用到 babel-plugin-transform-decorators-legacy 这个插件:

```
babel --plugins transform-decorators-legacy es6.js > es5.js
```
