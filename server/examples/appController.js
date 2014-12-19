var express = require("express"),
    app = express();
var controller=require('./controller/Controller1.js');
  app.get('/', function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html' });
  controller.save(); 
  var data=controller.GetAll();
  res.end(JSON.stringify(data));
});
  app.listen(8080);