function LoadImg(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener("load", () => {
            resolve(image);
        });
        image.src = url;
    });
}

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var player = {
    xPos: 0,
    yPos: 200,
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

    LoadImg("Pictures/background.png").then(image => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    });
    
    player.xPos += player.xVelocity;
    player.yPos += player.yVelocity;
    player.xVelocity *= 0.9;
    player.yVelocity *= 0.9;

    if (controller.left) {
        LoadImg("Pictures/leftrun.png").then(image => {
            context.drawImage(image, player.xPos, player.yPos, player.width, player.height);
        });
        player.xVelocity -= 2;
    }

    else if (controller.right) {
        LoadImg("Pictures/rightrun.png").then(image => {
            context.drawImage(image, player.xPos, player.yPos, player.width, player.height);
        });
        player.xVelocity += 2;
    }

    else {
        LoadImg("Pictures/passive.png").then(image => {
            context.drawImage(image, player.xPos, player.yPos, player.width, player.height);
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


















