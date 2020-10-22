var canvas = document.getElementById("block_breaker_canvas");
var ctx = canvas.getContext("2d");

var ballX = canvas.width / 2;
var ballY = canvas.height - 30;

var ballSpeed = 2

var ballDX = ballSpeed;
var ballDY = -ballSpeed;

var ballRadius = 10;

var barHeight = 5
var barWidth = 75

var barX = (canvas.width - barWidth) / 2;

var barSpeed = 2

var brickRowCount = 3;
var brickColumnCount = 5;
var brickPadding = 10;
var brickWidth = (canvas.width + brickPadding * brickRowCount) / brickRowCount
var brickHeight = 10


var isRightKeyPressed = false
var isLeftKeyPressed = false

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(barX, canvas.height - barHeight * 2, barWidth, barHeight);
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall()
    drawPaddle()

    if (ballY + ballDY < ballRadius) {
        ballDY = -ballDY;
    } else if (ballY + barHeight > canvas.height - ballRadius) {
        if (ballX > barX && ballX < barX + barWidth) {
            ballDY = -ballDY;
        } else {
            alert("Game Over!");
            document.location.reload();
            clearInterval(interval);
        }
    }

    if (ballX + ballDX < ballRadius || ballX + ballDX > canvas.width - ballRadius) {
        ballDX = -ballDX
    }

    if (isRightKeyPressed && barX + barWidth < canvas.width) {
        barX += barSpeed;
    } else if (isLeftKeyPressed && barX > 0) {
        barX -= barSpeed;
    }

    ballX += ballDX
    ballY += ballDY
}

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
        isRightKeyPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
        isLeftKeyPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
        isRightKeyPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
        isLeftKeyPressed = false;
    }
}

var interval = setInterval(draw, 10);