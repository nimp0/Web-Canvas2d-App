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

/*function Sprite(xPos, yPos, xIndex, yIndex, cols, rows, spriteWidth, spriteHeight) {

        this.xPos = xPos;
        this.yPos = yPos;
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.cols = cols;
        this.rows = rows;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;

    this.sheet = new Image();
    this.sheet.src = "Pictures/trump.png";

    this.sheet.onload = function () {

        Animation();
    }

    function Animation() {
        this.frames = 0;
        requestAnimationFrame(Animation);

        if ((++this.frame) % 4 > 0) return;
        //context.clearRect(0, 0, spriteWidth, spriteHeight);
        this.xIndex = (this.xIndex + 1) % this.cols;

        if (this.xIndex >= this.cols) {
            this.xIndex = 0;
        }

        context.drawImage(sheet,
            this.xIndex * this.spriteWidth, this.yIndex * this.spriteHeight, this.spriteWidth, this.spriteHeight,
            this.xPos, this.yPos, this.spriteWidth, this.spriteHeight);
    }
}*/

/*var xPos = 400;
var yPos = 300
var xIndex = 0;
var yIndex = 1;
var cols = 6;
var rows = 4;
var spriteWidth = 100;
var spriteHeight = 100;*/

//var hero = new Sprite(400, 300, 0, 1, 6, 4, 100, 100);


//var frame = 0;

/*function Animation() {
    requestAnimationFrame(Animation);

    if ((++frame) % 10 > 0) return;
    //context.clearRect(0, 0, spriteWidth, spriteHeight);
    xIndex = (xIndex + 1) % cols;

    if (xIndex >= cols) {
        xIndex = 0;
    }

    context.drawImage(sheet,
        xIndex * spriteWidth, yIndex * spriteHeight, spriteWidth, spriteHeight,
        0, 0, spriteWidth, spriteHeight);
}*/

var player = {
    xPos: 0,
    yPos: 200,
    xVelocity: 0,
    yVelocity: 1,
    height: 70,
    width: 60,
    jump: true,

    xIndex: 0,
    yIndex: 1,
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
    //context.clearRect(0, 0, spriteWidth, spriteHeight);
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
        LoadImg(sheet.src).then(image => {
            context.drawImage(image,
                player.xIndex * player.spriteWidth, player.yIndex * player.spriteHeight, player.spriteWidth, player.spriteHeight,
                player.xPos, player.yPos, player.spriteWidth, player.spriteHeight);
        });
        player.xVelocity -= 2;
    }

    else if (controller.right) {
        player.yIndex = 1;
        LoadImg(sheet.src).then(image => {
            context.drawImage(image,
                player.xIndex * player.spriteWidth, player.yIndex * player.spriteHeight, player.spriteWidth, player.spriteHeight,
                player.xPos, player.yPos, player.spriteWidth, player.spriteHeight);
        });
        player.xVelocity += 2;
    }

    else {
        player.yIndex = 0;
        LoadImg(sheet.src).then(image => {
            context.drawImage(image,
                player.xIndex * player.spriteWidth, player.yIndex * player.spriteHeight, player.spriteWidth, player.spriteHeight,
                player.xPos, player.yPos, player.spriteWidth, player.spriteHeight);
        });
    }

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




















