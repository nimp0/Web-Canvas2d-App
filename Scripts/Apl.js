var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

function LoadImg(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener("load", () => {
            resolve(image);
        });
        image.src = url;
    });
}

var player = {
    xPos: 0,
    yPos: 200,
    xVelocity: 0,
    yVelocity: 1,
    height: 70,
    width: 60,
    jump: true,

    xIndex: 0,
    yIndex: 0,
    cols: 6,
    rows: 4,
    spriteWidth: 100,
    spriteHeight: 100,
};

var sheet = new Image();
sheet.src = "Pictures/trump.png";
sheet.onload = function () {

    Animation();
}

var frame = 0;

function Animation() {
    requestAnimationFrame(Animation);
    if ((++frame) % 10 > 0) return;
    player.xIndex = (player.xIndex + 1) % player.cols;

    if (player.xIndex >= player.cols) {
        player.xIndex = 0;
    }
}

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

    LoadImg("Pictures/background.png").then(image => {
        context.drawImage(image, 0, 0, innerWidth, innerHeight);
    });

    player.xPos += player.xVelocity;
    player.yPos += player.yVelocity;
    player.xVelocity *= 0.8;
    player.yVelocity *= 0.8;

    if (controller.left) {
        player.yIndex = 3;
        player.xVelocity -= 2;
    }

    else if (controller.right) {
        player.yIndex = 1;
        player.xVelocity += 2;
    }

    else {
        player.yIndex = 0;
    }

    LoadImg("Pictures/trump.png").then(image => {
        context.drawImage(image,
            player.xIndex * player.spriteWidth, player.yIndex * player.spriteHeight, player.spriteWidth, player.spriteHeight,
            player.xPos, player.yPos, player.spriteWidth, player.spriteHeight);
    });

    if (controller.up && player.jump == false) {

        player.yVelocity -= 40;
        player.jump = true;
    }

    if (player.yPos + player.height >= canvas.height - 150) {
        player.yPos = canvas.height - 125 - player.height;
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

    requestAnimationFrame(MovementLogic);
}

addEventListener("keydown", controller.keyListener);
addEventListener("keyup", controller.keyListener);
requestAnimationFrame(MovementLogic);




















