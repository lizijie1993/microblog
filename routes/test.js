var express = require('express');
var router = express.Router();

router.get('/page',function(req,res,next){
  res.send('This is a test page.');
});

module.exports = router;