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
    canvas = $('#pong').get(0),
    ctx = canvas.getContext('2d'),
    width = canvas.width,
    height = canvas.height,
    paddleHeight = 100,
    paddleWidth = 30,
    PI = Math.PI,
    ballRadius = 15,
    ballX = width / 2,
    ballY = height / 2,
    incX = 5,
    incY = 5,
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
    // console.log(ballX);
    if (ballX + 25 >= (width - paddleWidth) && (ballY > rPaddlePos && ballY < rPaddlePos + paddleHeight )){
      incX = incX * -1;
      drawBall();
      return;
    }
    
    if(ballX <= paddleWidth && (ballY > lPaddlePos && ballY < lPaddlePos + paddleHeight )){
      incX = incX * -1;
      drawBall();
      return;
    }
    
    if (ballX < 1 || ballX >= (width - ballRadius*2)) {
        incX = incX * -1;
    }

    if (ballY < 1 || ballY >= (height - ballRadius*2)) {
        incY = incY * -1;
    }

    drawBall();

    socket.emit('ball', {x : ballX, y : ballY});
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
    // console.log(ballX)
    if (gameStarted) {
        requestAnimFrame(gameLoop);
    }
}

window.addEventListener('mousemove', function (e) {
  ctx.save();
  rPaddlePos = e.pageY - paddleHeight / 2;
  ctx.restore();
}, false);

$('#start').bind('click', function () {
    if (!gameStarted) {
        gameStarted = true;
        gameLoop();
        this.textContent = 'stop';
    } else {
        gameStarted = false;
        this.textContent = 'start';
    }
});
