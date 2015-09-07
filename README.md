# Node.js基础开发指南实例——Step-1	

## 本部分简介
本部分对应书本第五章5.5节，对原书中部分写法做了新版本的修正。

## 本实例中各工具版本

* node：v0.12.6
* npm：2.11.2
* express：4.13.1
* bootstrap：3.1.1
* ejs：version 2
* mongodb：3.0.6

## 建立微博网站

### 路由规划
路由是网站的骨架，因为它处于整个架构的枢纽位置，是各个接口的粘合剂。因此，在完成网站功能分析后，应优先考虑路由的规划。  
路由规划的基本思路，与书上保持一致，本实例仅修改了路由的写法，思路参照 [step-0](https://github.com/lizijie1993/node_microblog/tree/step-0#路由控制)。

修改app.js

```javascript
//app.js
var routes = require('./routes/index');
var user = require('./routes/user');
var post = require('./routes/post');
var reg = require('./routes/reg');
var login = require('./routes/login');
var logout = require('./routes/logout');

app.use('/', routes);
app.use('/u/:user', user);
app.use('/post', post);
app.use('/reg', reg);
app.use('/login', login);
app.use('/logout', logout);

```

在router文件夹中，新建index.js、user.js、post.js、reg.js、login.js、logout.js，其中index.js内容如下：

```javascript
//index.js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

module.exports = router;
```

其余js内容以user.js为例，如下：

```javascript
//user.js
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('user page.');
});

module.exports = router;
```

### 使用Bootstrap
将bootstrap相关的文件，放入public文件夹中。  
bootstrap3中没有bootstrap.responsive.css，而是集成在bootstrap.css中了，仅此仅需引用bootstrap.css。  
[bootstrap3传送门](http://v3.bootcss.com/)

目前版本的ejs不支持书中写的 `layout.js` ，因此采用ejs官方的 `include` 方法，进行改写：

创建 `header.ejs` ，内容如下：

```html
<!DOCTYPE html>
<html>
<head>
    <title><%= title %> - Microblog</title>
    <link rel='stylesheet' href='/stylesheets/bootstrap.min.css' />
    <style>
        body{
            padding-top: 60px;
            padding-bottom: 40px;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="/" class="navbar-brand">Microblog</a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="/">首页<span class="sr-only">(current)</span></a></li>
                    <li><a href="/login">登入</a></li>
                    <li><a href="/reg">注册</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div id="container" class="container">
```

创建footer.ejs，内容如下：

```html
          <hr>
          <footer>
               <p><a href="http://www.byvoid.com/" target="_blank">BYVoid</a> 2012</p>
          </footer>
     </div>
</body>
<script src="/javascripts/jquery.min.js"></script>
<script src="/javascripts/bootstrap.min.js"></script>
</html>
```

创建index.ejs，内容如下：

```html
<%- include header.ejs %>

<div class="hero-unit">
     <h1>欢迎来到 Microblog</h1>
     <p>Microblog 是一个基于 Node.js 的微博系统。</p>
     <p>
          <a href="/login" class="btn btn-primary btn-large">登录</a>
          <a href="/reg" class="btn btn-large">立即注册</a>
     </p>
</div>

<div class="row">
     <div class="col-xs-4">
          <h2>Carbo 说</h2>
          <p>东风破早梅 向暖一枝开 冰雪无人见 春从天上来</p>
     </div>
     <div class="col-xs-4">
          <h2>BYVoid 说</h2>
          <p>
               Open Chinese Convert (OpenCC) 是一个开源的中文简繁转换项目，致力于制作高质量的基于统计预料的简繁转换词库。还提供函数库(libopencc)、命令行简繁转换工具、人工校对工具、词典生成程序、在线转换服务及图形用户界面。
          </p>
     </div>
     <div class="col-xs-4">
          <h2>佛振 说</h2>
          <p>
               中州韵输入法引擎 /Rime Input Method Engine 取意历史上通行的中州韵，原写就一部汇集音韵学智慧的输入法经典之作。项目网站设在 http://code.google.com/p/rimeime/ 创造应用价值时一方面，更要坚持对好技术的追求，希望能写出灵动而易于扩展的代码，使其成为一款个性十足的开源输入法。
          </p>
     </div>
</div>

<%- include footer.ejs %>
```

通过 `include` 的方式，将各页面公用的 `header` 和 `footer` 进行引入。

注：顶部导航条代码有所变化，详细介绍见[官网navbar组件](http://v3.bootcss.com/components/#navbar)。

## 小结
本部分主要介绍了如何将原书中路由规划、界面设计修改为当前版本支持的方法。接下来，会介绍第五章5.6节的修改，详见[step-2](https://github.com/lizijie1993/microblog/tree/step-2)。