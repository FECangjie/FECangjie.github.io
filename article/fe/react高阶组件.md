---
createTime : 2017/12/22
author : 7nxo
title : React 高阶组件
subtitle: 深入理解 React 高阶组件
---

# React 高阶组件

> 原文链接：[React Higher Order Components in depth](https://zhuanlan.zhihu.com/p/24776678?group_id=802649040843051008)

## HOC 工厂的实现方法

React 中两种 HOC 的实现方法：Props Proxy (PP) and Inheritance Inversion (II)。两种方法都可以操作 WrappedComponent。

### Props Proxy

``` js
function ppHOC(WrappedComponent) {  
  return class PP extends React.Component {    
    render() {      
      return <WrappedComponent {...this.props}/>    
    }  
  }
}
```

使用 Props Proxy 可以做什么？

1 操作 props
2 通过 Refs 访问到组件实例
3 提取 state
4 用其他元素包裹 WrappedComponent

### Inheritance Inversion

``` js
function iiHOC(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    render() {
      return super.render()
    }
  }
}
```

使用 Inheritance Inversion 可以做什么？

1 渲染劫持（Render Highjacking）
2 操作 state

### 命名

用 HOC 包裹了一个组件会使它失去原本 WrappedComponent 的名字，可能会影响开发和调试。

通常会用 WrappedComponent 的名字加上一些 前缀作为 HOC 的名字。

### 和父组件区别

- 渲染劫持
- 操作内部 props
- 提取 state。但也有它的不足。只有在显式地为它创建钩子函数后，你才能从父组件外面访问到它的 props。这给它增添了一些不必要的限制。
- 用新的 React 组件包裹。这可能是唯一一种父组件比 HOC 好用的情况。HOC 也可以做到。
- 操作子组件会有一些陷阱。例如，当子组件没有单一的根节点时，你得添加一个额外的元素包裹所有的子组件，这让你的代码有些繁琐。在 HOC 中单一的根节点会由 React/JSX语法来确保。
- 父组件可以自由应用到组件树中，不像 HOC 那样需要给每个组件创建一个类。
一般来讲，可以用父组件的时候就用父组件，它不像 HOC 那么 hacky，但也失去了 HOC 可以提供的灵活性。
