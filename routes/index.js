var express = require('express');
var router = express.Router();
var reg = require('./reg');
var login = require('./login');
var logout = require('./logout');

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.use('/reg', reg);

router.use('/login', checkNotLogin);
router.use('/login', login);

router.use('/logout', checkLogin);
router.use('/logout', logout);

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
