var express = require('express');
var router = express.Router();
var reg = require('./reg');
var login = require('./login');
var logout = require('./logout');
var post = require('./post');
var user = require('./user');

var Post = require('../models/post');

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

router.use('/reg', reg);

router.use('/login', checkNotLogin);
router.use('/login', login);

router.use('/logout', checkLogin);
router.use('/logout', logout);

router.use('/post', checkLogin);
router.use('/post', post);

router.use('/u', user);

function checkLogin(req,res,next){
	if(!req.session.user){
		req.flash('error','未登录');
		return res.redirect('/login');
	}
	next();
}

function checkNotLogin(req,res,next){
	if(req.session.user){
		req.flash('error','已登录');
		return res.redirect('/');
	}
	next();
}

module.exports = router;
