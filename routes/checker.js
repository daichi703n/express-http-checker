var express = require('express');
var router = express.Router();
var request = require('then-request');
var util = require('util');
function dump(v){return console.log(util.inspect(v));}
// http://creator.cotapon.org/articles/node-js/node_js-object-consoledump

/* GET http pages. */
router.get('/', function(req, res, next) {
  var dst = req.query.path;

  console.log("dst: "+dst);
  if(typeof dst !== "undefined"){
    request('GET', dst).done(function (result) {
      //dump(result);
      //console.log(result.getBody('utf8'));
      res.render('checker', { 
        title: 'HTTP/S Checker',
        path: dst,
        code: result.statusCode,
        date: result.headers.date,
        body: result.getBody('utf8')
      });
    });
  
  }else{
    res.render('checker', { 
      title: 'HTTP/S Checker'
    });
  }
});

module.exports = router;
