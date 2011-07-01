window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var doc = document,
    win = window,
    $ = function (id) {return doc.getElementById(id);},
    canvas = $('pong'),
    ctx = canvas.getContext('2d'),
    width = canvas.width,
    height = canvas.height,
    paddleHeight = 100,
    paddleWidth = 30,
    PI = Math.PI,
    ballRadius = 15,
    ballX = width / 2,
    ballY = height / 2,
    incX = 10,
    incY = 10,
    lPaddlePos = 0,
    rPaddlePos = 0,
    gameStarted = false;

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPaddle(s) {
    clearCanvas();
    ctx.beginPath();
    ctx.rect(0, lPaddlePos, paddleWidth, paddleHeight);
    ctx.fill();

    ctx.beginPath();
    ctx.rect(770, rPaddlePos, paddleWidth, paddleHeight);
    ctx.fill();

}

function moveBall() {
    ballX += incX;
    ballY += incY;

    if (ballX < 1 || ballX >= (width - ballRadius*2)) {
        incX = incX * -1;
    }

    if (ballY < 1 || ballY >= (height - ballRadius*2)) {
        incY = incY * -1;
    }

    drawBall();
}

function drawBall() {
    ctx.save();
    ctx.translate(ballX, ballY);
    ctx.beginPath();
    ctx.arc(ballRadius, ballRadius, ballRadius, 0, 2 * PI, true);
    ctx.fill();
    ctx.restore();
}

function gameLoop() {
    drawPaddle();
    moveBall();

    if (gameStarted) {
        requestAnimFrame(gameLoop);
    }
}

doc.addEventListener('keypress', function (e) {
    //38 up 40 down
    switch (e.keyCode) {
        case 38:
            rPaddlePos -= 10;
            break;
        case 40:
            rPaddlePos += 10;
            break;
    }
}, false);

$('start').addEventListener('click', function () {
    if (!gameStarted) {
        gameStarted = true;
        gameLoop();
        this.textContent = 'stop';
    } else {
        gameStarted = false;
        this.textContent = 'start';
    }
}, false);