var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var child_process = require("child_process");

var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/', urlencodedParser, function (req, res) {


  
  var response = req.body.Location;

  console.log(response);
  var workproc1 = child_process.fork('./public/javascripts/beacon1.js');
  var workproc2 = child_process.fork('./public/javascripts/beacon2.js');
  var workproc3 = child_process.fork('./public/javascripts/beacon3.js');
  var workproctri = child_process.fork('./public/javascripts/trilateration.js');
  let triAns;
  workproctri.on('message', (msg) => {
    triAns = msg;
    console.log(triAns);
    workproc1.kill(2);
    workproc2.kill(2);
    workproc3.kill(2);
    workproctri.kill(2);
  });
  workproc1.send(response);
  workproc2.send(response);
  workproc3.send(response);
  workproctri.send(response);
  workproctri.on("close", () => {
    res.render('result', { 
      title: '3X3 IPS' ,
      cordX: triAns.cordX,
      cordY: triAns.cordY,
      acc: triAns.acc,
      loc: triAns.location,
      qty: triAns.quantity
    });
    res.end();
  });
});


module.exports = router;
