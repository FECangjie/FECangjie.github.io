---
createTime : 2017/12/11
author : 7nxo
title : WebSocket 介绍
subtitle: WebSocket
---

# WebSocket

## 【1】背景

Ajax的出现，丰富了我们网页的交互 ，客户端可以从服务器获取数据，局部刷新页面的内容。这些请求大部分是基于http协议的，只能由客户端发起请求，而服务端在响应中返回数据。一旦需要加载最新的数据，客户端就得给服务端发请求。

如果服务端数据更新频繁，需要推送的情况下，就需要客户端一直轮询，或者使用commet。

以下是几种常见的基于http实现的，服务推送技术：


| 方法        |  实现方式   |  优点  | 缺点 | 实例 |
| --------   | -----   | :----: | :----: | ---- |
| 轮询 | 客户端以一定的时间间隔发送Ajax请求 | 实现简单 | 1. 有大量无用请求；2. 频繁建立释放TCP连接，消耗带宽和资源 | im |
| 长轮询 | 服务端接收到请求后会保持住不立即返回响应，等到有消息更新才返回响应并关闭连接，客户端处理完响应再重新发起请求。| 没有无用请求 | 保持连接需要消耗资源 | WebQQ、Hi网页版、Facebook IM |
| 长连接 | 在页面中嵌入一个隐藏的iframe,将其src设为一个长连接的请求，这样服务端就能不断向客户端发送数据。优缺点与长轮询相仿。| 消息即时到达，不发无用请求 | 维护长连接会增加开销。 | Gmail聊天 |

**Web QQ 长轮询**

![Web QQ 长连接](./img/3.png)

传统服务推送的不足：

- 1. 服务器需要很大的开销
- 2. 都做不到真正意义上的“主动推送”，服务端只能“被动”地响应


> 在处理高并发及实时性需求的时候，我们需要一种高效节能的双向通信机制来保证数据的实时传输。在此背景下，基于 HTML5 规范的、有 Web TCP 之称的 WebSocket 应运而生。


## 【2】简介

> WebSockets是一个在**单个TCP连接**上，进行**全双工**会话的高级技术。通过这个API你可以向服务器发送消息并接受基于**事件驱动**的响应，这样就不用向服务器轮询获取数据了。

> WebSocket通信协议于2011年被IETF定为标准RFC 6455，并由RFC7936补充规范。WebSocket API也被W3C定为标准。


Websocket使用ws或wss的统一资源标志符，类似于HTTPS，其中wss表示在TLS之上的Websocket。

```
ws://example.com/wsapi
wss://secure.example.com/
```

### 握手协议

Websocket 通过 HTTP/1.1 协议的101状态码进行握手。

一个典型的WebSocket请求，如下图所示：
![WebSocket请求结构](./img/4.png)

![WebSocket Frames](./img/5.png)

**字段说明：**

- Request Header
	- Connection：必须设置Upgrade，表示客户端希望连接升级
	- Upgrade：必须设置Websocket，表示希望升级到Websocket协议
	- Sec-WebSocket-Key：随机的字符串，服务器端会用这些数据来构造出一个SHA-1的信息摘要。把“Sec-WebSocket-Key”加上一个特殊字符串“258EAFA5-E914-47DA-95CA-C5AB0DC85B11”，然后计算SHA-1摘要，之后进行BASE-64编码，将结果做为“Sec-WebSocket-Accept”头的值，返回给客户端。如此操作，可以尽量避免普通HTTP请求被误认为Websocket协议。
	- Sec-WebSocket-Version： 表示支持的Websocket版本。RFC6455要求使用的版本是13，之前草案的版本均应当弃用

- Response Header
	- Connection：同上
	- Upgrade：同上
	- Sec-WebSocket-Accept：随机的字符串，同RequestHeader。
	- Sec-WebSocket-Version： 表示使用的Websocket版本。
	- WebSocket-Server

- Frames
	- WebSocket 建立连接后，发送的数据都在Frames中，不再发起新的请求。
	- client和server分别通过事件回调，响应新消息

### 与http区别

|         | WebSocket   |  http  |
| --------   | -----   | :----: |
| 模式 |  全双工 | 半双工 |
| 状态 | 有状态 | 无状态 |
| 跨域 | 可以跨域 | 受同源策略限制 |

![WebSocket与HTTP](./img/2.png)

## 【3】WebSocket实践
### 客户端API

```javascript
// 发起连接
const socket = new WebSocket('ws://localhost:8080');

// 发送消息（字符串、ArrayBuffer（二进制数据）或者Blob）
socket.send('data');

// 关闭连接
socket.close();

// 监听连接建立
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// 监听消息
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

```

### 服务端实现
- [µWebSockets](https://github.com/uWebSockets/uWebSockets)
- [socket.io](http://socket.io/)
- [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)

### 应用场景

- 多人在线游戏
- 聊天室[DEMO地址](https://github.com/linwei0201/chat-room)
- 视频直播、弹幕
- 即时消息推送（微博评论等）
- 股票基金实时报价

### 局限性

WebSocket虽然解决了服务器和客户端两边的问题，但是网络应用除了服务器和客户端之外，还需要依赖网络链路。每个连接都需要经过无数路由的转发，才能从客户端，抵达服务器。如果连接过程中，中间节点认为在一段时间内没有数据发送就等于失效，它们会自作主张的切断这些连接。在这种情况下，不论服务器还是客户端都不会收到任何提示。而计算机网络协议栈的实现中又会有一层套一层的缓存，除非填满这些缓存，你的程序根本不会发现任何错误。这样，本来一个美好的 WebSocket 长连接，就可能在毫不知情的情况下进入了半死不活状态。

## 【4】兼容性
![浏览器兼容性](./img/1.png)

## 【5】参考链接

- [MDN-WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [维基百科](https://zh.wikipedia.org/wiki/WebSocket)
- [阮一峰，WebSock教程](http://www.ruanyifeng.com/blog/2017/05/websocket.html)
