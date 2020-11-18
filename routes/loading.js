var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var child_process = require("child_process");

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', urlencodedParser, function(req, res) {
    res.render('loading', { 
        title: 'Loading...' ,
      });
      // res.redirect('../result');
  });

module.exports = router;