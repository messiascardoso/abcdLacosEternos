
var http = require('http');
var https = require('https')
var app = require('./config/express')();
var fs = require('fs');
var argv = require('optimist').argv;
require('./config/passport')();
require('./config/database.js')('mongodb://localhost/abcdLacosEternos');




