var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var player = {
    xPos: 0,
    yPos: 0,
    xVelocity: 0,
    yVelocity: 0,
    height: 70,
    width: 60,
    jump: true
};

var controller = {
    left: false,
    right: false,
    up: false,

    keyListener: function (event) {
        var keyState = (event.type == "keydown") ? true : false;

        switch (event.key) {
            case "ArrowRight":
                controller.right = keyState;
                break;
            case "ArrowLeft":
                controller.left = keyState;
                break;
            case " ":
                controller.up = keyState;
                break;
        }
    }
}

function MovementLogic() {

    if (controller.left) {
        player.xVelocity -= 2;
    }
    if (controller.right) {
        player.xVelocity += 2;
    }
    if (controller.up && player.jump == false) {
        player.yVelocity -= 50;
        player.jump = true;
    }

    if (player.yPos + player.height >= canvas.height) {
        player.yPos = canvas.height - player.height + 10;
        player.jump = false;
    }
    else {
        player.yPos += 20;
    }

    if (player.xPos + player.width >= canvas.width) {
        player.xPos = canvas.width - player.width;
    }

    if (player.xPos - player.width <= 0) {
        player.xPos = 0 + player.width;
    }

    player.xPos += player.xVelocity;
    player.yPos += player.yVelocity;
    player.xVelocity *= 0.9;
    player.yVelocity *= 0.9;

    ImportImg();
    requestAnimationFrame(MovementLogic);
}

function ImportImg() {
    var hero = new Image();
    hero.src = "pictures/hero.png";
    hero.onload = function () {
        context.clearRect(0, 0, innerWidth, innerHeight);
        context.drawImage(hero, player.xPos, player.yPos, player.width, player.height);
    }
}

addEventListener("keydown", controller.keyListener);
addEventListener("keyup", controller.keyListener);
requestAnimationFrame(MovementLogic);



















