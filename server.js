


var http = require('http');
var https = require('https')
var app = require('./config/express')();
var fs = require('fs');
var argv = require('optimist').argv;
require('./config/passport')();
require('./config/database.js')('mongodb://localhost/abcdLacosEternos');


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express Server escutando na porta ' + app.get('port'));
});



