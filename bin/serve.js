var express = require('express');
var path = require('path');

var port = process.env.PORT || 5000;
var app = express();

app.use('/', express.static(path.join(__dirname, '../build/')));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/index.html'), {root: __dirname} );
});

app.listen(port, function() {
    console.log("Server running and listening on " + port);
});