var express = require('express');
var router = express.Router();
var dns = require('dns');
var ping = require('ping');

var util = require('util');
function dump(v){
  return console.log(util.inspect(v));
}

var defPath = "k-simple.apps.cf.ddreams.local"
var defPath = "zssg-infki01.ddreams.local"

/* GET dns_check page. */
router.get('/', function(req, res, next) {
  var path = req.query.path
  //console.log(path)
  if(typeof path==="undefined"){
    res.render('dns_check', {
      title: 'Express DNS Get',
      resPath: defPath
    });
  }else if(path=="localhost"){
    //console.log('localhost');
    //ping.sys.probe(path, function(isAlive){
    ping.promise.probe(path)
        .then(function(res){
      //){
      //var msg = isAlive ? 'host ' + path + ' is alive' : 'host ' + path + ' is dead';
      console.log(res);
    });
    res.render('dns_check', {
      title: 'Express DNS Get',
      resPath: path
    });
  }else{
    dns.resolve4(path, function (err, addresses) {
      if (err) {
        //throw err;
        res.render('dns_check', {
          title: 'Express DNS Get',
          resPath: path
        });
        return 0;
      }
      console.log('addresses: '+JSON.stringify(addresses));
      addresses.forEach(function (a) {
        dns.reverse(a, function (err, hostnames) {
          if (err) {
            //throw err; //Skip when error, don't stop
          }
          console.log('reverse for ' + a +': ' + JSON.stringify(hostnames));
          var ptr = JSON.stringify(hostnames);
          if (typeof ptr === "undefined"){ptr = "Non-existent"};
          res.render('dns_check', {
            title: 'Express DNS Get',
            resPath: path,
            aRecord: a,
            revRecord: ptr
           });
        });
      });
    });
  };
});
router.post('/', function(req, res) {
  console.log(req.body)
  res.render('dns_check', {
    title: 'Express dns_check',
    word: req.body
   });
});

module.exports = router;
