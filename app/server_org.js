var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var port = 3000;
app.use(express.static(__dirname + '/node.web-server'));

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
app.all("/dmc/v1.0/schemas/connections", function(req, res) {
    console.log('Proxy redirecting to connections');
    apiProxy.web(req, res, {target: pythonAPI});
});

app.listen(port, function(){
    console.log('Server started on ' + port);
});
