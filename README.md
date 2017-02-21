# Node.js基础开发指南实例

## 为什么要写这个?
[《Node.js基础开发指南》](http://book.douban.com/subject/10789820/)是我看的第一本node.js的书。个人感觉，这是一本非常不错的入门书！之后一段时间没有使用node.js，对其中的很多东西印象不深了，所以重新翻看了一遍。但由于各工具更新太快（express、ejs等），书中的案例已经无法正常运行。因此，在此建立以目前各工具最新版本为基础的实例，配合自己制作的过程的记录，希望能给原书读者的学习带来便利，同时方便自己总结学习的成果。

## 本实例中各工具版本

* node：6.9.4
* npm：3.10.10
* express：4.14.0
* bootstrap：3.3.5
* jQuery：1.12.4
* ejs：2.5.5
* mongodb：3.4.2

## 内容简介
本实例只包含第五章《使用Node.js进行web开发》部分，对其中无法正常运行的代码进行了修正。书本其余理论部分及有效代码不包括其中，可参照书本原文。

本实例内容分为以下几个部分：

1. [step-0](https://github.com/lizijie1993/node_microblog/tree/step-0)：对应书本第五章5.2-5.4节，修正了 **建立工程** 、 **路由控制** 、 **模板引擎** 的代码；
2. [step-1](https://github.com/lizijie1993/node_microblog/tree/step-1)：对应书本第五章5.5节，修正了 **路由规划** 、 **使用Bootstrap** 的代码；
3. [step-2](https://github.com/lizijie1993/node_microblog/tree/step-2)：对应书本第五章5.6节，修正了 **连接数据库** 、 **会话支持** 、 **注册登录** 的代码；
4. [step-3](https://github.com/lizijie1993/node_microblog/tree/step-3)：对应书本第五章5.7节，修正了 **发表微博** 、 **用户页面** 、 **首页** 的代码。

实例中的源码，均可在本仓库的各个分支中下载。主分支将包含最终完成的代码。

下载代码后，需要在文件夹中通过以下命令安装依赖后才能正常运行：

```
$ npm install
```
