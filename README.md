# Node.js基础开发指南实例——Step-3
## 本部分简介

本部分对应书本第五章5.7节，对原书中部分写法做了新版本的修正。

## 本实例中各工具版本

* node：v0.12.6
* npm：2.11.2
* express：4.13.1
* bootstrap：3.1.1
* ejs：version 2
* mongodb：3.0.6

## 发表微博

### 发表微博

#### 修改路由控制

index.js新增如下代码：

```javascript
var post = require('./post');

router.use('/post', checkLogin);
router.use('/post', post);
```

在routes文件夹中新增post.js：

```javascript
var express = require('express');
var router = express.Router();
var Post = require('../models/post');

router.post('/', function(req, res, next) {
    var currentUser = req.session.user;
    var post = new Post(currentUser.name, req.body.post);
    post.save(function(err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', '发表成功');
        res.redirect('/u/' + currentUser.name);
    });
});

module.exports = router;
```

### 用户页面

#### 修改路由控制

index.js新增如下代码：

```javascript
var user = require('./user');

router.use('/u/:user', user);
```

在routes文件夹中新增user.js：

```javascript
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.get(req.param.user,function(err,user){
  	if(!user){
  		req.flash('error','用户不存在');
  		return res.redirect('/');
  	}
  	Post.get(user.name,function(err,posts){
  		if(err){
  			req.flash('error',err);
  			return res.redirect('/');
  		}
  		res.render('user',{title:user.name,posts:posts});
  	});
  });
});

module.exports = router;
```

#### 修改视图
views文件夹新增say.ejs，post.ejs，user.ejs，分别如下：

```html
<!-- say.ejs -->
<form method="post" action="/post" class="well form-inline" style="text-align:
center;">
<div class="col-sm-10">
<input type="text" class="form-control" style="width:100%;" name="post"></div>
<button type="submit" class="btn btn-success"><span class="glyphicon glyphicon-comment" aria-hidden="true"></span>
</i> 发言</button>
</form>
```

```html
<!-- post.ejs -->
<% posts.forEach(function(post, index) {
	if (index % 3 == 0) { %>
	<div class="row">
		<% } %>
		<div class="col-xs-4">
			<h2><a href="/u/<%= post.user %>"><%= post.user %></a> 说</h2>
			<p><small><%= post.time %></small></p>
			<p><%= post.post %></p>
		</div>
		<% if (index % 3 == 2) { %>
	</div><!-- end row -->
	<% } %>
	<% }) %>
	<% if (posts.length % 3 != 0) { %>
</div><!-- end row -->
<% } %>
```

```html
<!-- say.ejs -->
<%- include header.ejs %>

<% if(user) { %>
<%- include say.ejs %>
<% } %>

<%- include post.ejs %>

<%- include footer.ejs %>
```

### 首页

#### 修改路由控制

修改index.js：

```javascript
router.get('/', function(req, res, next) {
	Post.get(null, function(err, posts) {
		if (err) {
			posts = [];
		}
		res.render('index', {
			title: '首页',
			posts: posts
		});
	});
});
```

#### 修改视图

修改index.ejs如下：

```html
<% if(!user()) { %>
<div class="jumbotron">
	<h1>欢迎来到 Microblog</h1>
	<p>Microblog 是一个基于 Node.js 的微博系统。</p>
	<p>
		<a href="/login" class="btn btn-primary btn-large">登录</a>
		<a href="/reg" class="btn btn-large">立即注册</a>
	</p>
</div>

<% } else { %>
<%- include say.ejs %>
<% } %>
<%- include post.ejs %>
```

## 小结
本部分主要介绍了如何将原书中发表微博、用户页面、首页修改为当前版本支持的方法。到目前为止，原书上的microblog实例已修改完毕。