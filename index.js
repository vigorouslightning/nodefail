var express = require('express');
var path = require('path');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http); //Lookup this syntax

var users = 0;

app.use(express.static(path.resolve('./')));

app.get('/', function(req, res) {
    res.sendFile('index.html'); 
});

var port = process.env.PORT || 8000;

io.on('connection', function(socket) {
    socket.on ('player move', function (msg) {
        io.emit ('updatePlayer', msg);
        console.log(msg);
    });
});

io.on('disconnect', function(socket){
    users--;
    console.log(users + ' connected');
});



http.listen(port, function(){
    console.log('listening on *:3000');
});