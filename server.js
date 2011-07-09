var sio = require('socket.io'),
    express = require('express');

var app = express.createServer();

app.configure(function () {
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req, res) {
  res.render('index', { layout: false });
});


app.listen(80, function () {
  var addr = app.address();
  console.log(' app listening on http://' + addr.address + ':' + addr.port);
});

var io = sio.listen(app),
         users = {};

io.sockets.on('connection', function (socket) {
    socket.on('ball', function (e) {
        socket.emit('poop', e);
    })
});
         