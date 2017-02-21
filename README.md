# Node.js基础开发指南实例——Step-2

## 本部分简介

本部分对应书本第五章5.6节，对原书中部分写法做了新版本的修正。

## 本实例中各工具版本

* node：6.9.4
* npm：3.10.10
* express：4.14.0
* bootstrap：3.3.5
* jQuery：1.12.4
* ejs：2.5.5
* mongodb：3.4.2

## 用户注册和登录

### 访问数据库

安装mongodb依赖：

```
$ npm install mongodb --save
```

在node.js环境下，访问mongodb的方法有所改变（[quick-star](http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/)）。

修改settings.js如下:

```javascript
module.exports = {
    cookieSecret: 'microblogbyvoid',//用于cookie加密
    url: 'mongodb://localhost/microblog',//Mongodb连接字符串URI
    db:'microblog'//数据库名称
};
```

修改db.js如下：

```javascript
//创建数据库连接
var settings = require('../settings');
var MongoClient = require('mongodb').MongoClient;

var database = {};

database.open = function(fn) {
    MongoClient.connect(settings.url, function(err, db) {
        if (fn !== 'undefined' && typeof fn == 'function') {
            fn(err, db);
        }

        database.close = function() {
            db.close();
        };

        console.log("Connected correctly to server.");
    });
};

module.exports = database;
```

### 会话支持

安装connect-mongo，用于将session持久化保存于mongodb：

```
$ npm install connect-mongo --save
```

之后在app.js添加：

```javascript
var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: settings.cookieSecret,
    resave: false,
  	saveUninitialized: true,
    store: new MongoStore({
        url: settings.url
    })
}));
```

修改app.js路由部分如下：

```javascript
//删除所有routes文件夹内容的引用，仅保留：
var routes = require('./routes/index');

//路由部分仅保留
app.use(routes);
```

其余部分详见本分支routes文件夹各js文件。

### 注册和登录

#### 注册页面
使用Bootstrap3进行了改写，详见[reg.ejs](https://github.com/lizijie1993/microblog/tree/step-2/views/reg.ejs)。（[bootstrap3表单](http://v3.bootcss.com/css/#forms)）

#### 注册响应
书中使用到 `req.flash`，作用是：通过它保存的变量生命周期是用户当前和下一次请求，之后会被清除。在目前版本的express中已经废弃，需要安装connect-flash：

```
$ npm install connect-flash --save
```

之后在app.js添加：

```javascript
var flash = require('connect-flash');

app.use(flash());
```

#### 视图交互
根据[step-0](https://github.com/lizijie1993/microblog/tree/step-0#视图助手)中的说明，app.js中动态视图助手部分修改如下：

```javascript
app.use(function(req, res, next) {
    app.locals.user = function() {
        return req.session.user;
    };
    app.locals.regValidate = {
        statusStr: '',
        success: function() {
            var succ = this.statusStr = req.flash('success');
            if (succ.length) {
                return succ;
            } else {
                return null;
            }
        },
        error: function() {
            var err = this.statusStr = req.flash('error');
            if (err.length) {
                return err;
            } else {
                return null;
            }
        }
    };
    next();
});
```

修改导航栏header.ejs

```html
<ul class="nav navbar-nav">
    <li class="active"><a href="/">首页<span class="sr-only">(current)</span></a></li>
    <% if(!user) { %>
    <li><a href="/login">登入</a></li>
    <li><a href="/reg">注册</a></li>
    <% } else { %>
    <li><a href="/logout">登出</a></li>
    <% } %>
</ul>
```

container之后加上：

```html
<% if( regValidate.success()) { %>
    <div class="alert alert-success">
        <%= regValidate.statusStr %>
    </div>
<% } %>
<% if( regValidate.error()) { %>
    <div class="alert alert-danger">
        <%= regValidate.statusStr %>
    </div>
<% } %>
```

注意，**不能**采用如下写法：

```javascript
//app.js
app.use(function(req, res, next) {
    app.locals.user = function() {
        return req.session.user;
    };
    app.locals.success=function() {
            var succ = req.flash('success');
            if (succ.length) {
                return succ;
            } else {
                return null;
            }
        };
     app.locals.error=function() {
            var err = req.flash('error');
            if (err.length) {
                return err;
            } else {
                return null;
            }
        };
});
```

```html
//header.ejs
<% if( success()) { %>
    <div class="alert alert-success">
        <%= success() %>
    </div>
<% } %>
<% if( error()) { %>
    <div class="alert alert-error">
        <%= error() %>
    </div>
<% } %>
```

这样修改，**无法获得错误或成功提示**。因为req.flash()保存的字符串获取一次后就会清空。因此需要将其保存在一个变量中，供公共使用。

### 页面控制权转移
修改index.js如下：

```javascript
router.use('/login', checkNotLogin);//新增
router.use('/login', login);

router.use('/logout', checkLogin);//新增
router.use('/logout', logout);
```

## 小结
本部分主要介绍了如何将原书中连接数据库、会话支持、注册登录修改为当前版本支持的方法。接下来，会介绍第五章5.7节的修改，详见step-3。