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
