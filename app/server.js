var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();

app.use(express.static(__dirname + '/ui'));

var pythonAPI = 'http://localhost:5000/';

app.all("/dmc/v1.0/schemas", function(req, res) {
    console.log('redirecting to schemas');
    apiProxy.web(req, res, {target: pythonAPI});
});
app.all("/dmc/v1.0/schemas/schema_id", function(req, res) {
    console.log('redirecting to schema_id');
    apiProxy.web(req, res, {target: pythonAPI});
});
app.all("/dmc/v1.0/schemas/denorm", function(req, res) {
    console.log('redirecting to denorm');
    apiProxy.web(req, res, {target: pythonAPI});
});

app.listen(3000, function(){
    console.log('Server started on 3000');
});
