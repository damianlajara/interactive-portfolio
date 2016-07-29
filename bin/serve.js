var express = require('express');
var path = require('path');

var port = process.env.PORT || 5000;
var app = express();

app.get('*', function(request, response) {
    response.sendFile(path.join(__dirname + '/../index.html'));
});

app.listen(port, function() {
    console.log("Listening on " + port);
});