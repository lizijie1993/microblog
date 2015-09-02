var express = require('express');
var router = express.Router();
var reg=require('./reg');

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.use('/reg',reg);

module.exports = router;
