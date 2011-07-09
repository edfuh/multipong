// socket.io specific code
var socket = io.connect();

socket.on('connect', function () {
    $('#msg').text('connected');
});

socket.on('poop', function (ball) {
    lPaddlePos = ball.y;
})
