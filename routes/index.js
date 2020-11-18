var express = require('express');
var router = express.Router();
var locData = require('../public/constant/data.json');
var child_process = require("child_process");



// for(var i=1; i<2; i++) {
//   var workproc = child_process.fork('./public/javascripts/beacon'+ i+'.js');
//   workproc.on('exit',function () {
  
//   });
// }
// console.log("1312");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: '3X3 IPS' ,
    locData: locData});
});






module.exports = router;
