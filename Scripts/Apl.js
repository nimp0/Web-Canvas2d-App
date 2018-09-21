var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const defaultPlayerData = {
    xPos: 0,
    yPos: 200,
    xVelocity: 0,
    yVelocity: 0,
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

function CreatePlayerData() {
    return { ...defaultPlayerData };
}

function LoadImg(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener("load", () => {
            resolve({ image, url });
        });
        image.src = url;
    });
}

let backgroundImage = null;
let playerImage = null;

const assetStateData = {
    "Pictures/background.png": null,
    "Pictures/trump.png": null
};

let currentPlayer = CreatePlayerData();
console.log(currentPlayer);

ON_ALL_ASSETS_LOADED = () => {
    backgroundImage = assetStateData["Pictures/background.png"];
    playerImage = assetStateData["Pictures/trump.png"];
    requestAnimationFrame(MovementLogic);
};

function AreAllAssetsLoaded() {
    let result = true;
    for (let k in assetStateData) {
        if (!assetStateData[k]) {
            result = false;
            break;
        }
    }

    return result;
}

function InitializeAssets() {
    const resolver = ({ image, url }) => {
        assetStateData[url] = image;
        const isThisAll = AreAllAssetsLoaded();
        if (isThisAll) {
            ON_ALL_ASSETS_LOADED();
        }
    };

    for (let k in assetStateData) {
        LoadImg(k).then(resolver);
    }
}

InitializeAssets();

let currentPlayerAnimationFrame = 0;
function PlayAnimation() {
    if ((++currentPlayerAnimationFrame) % 10 > 0) {
        return;
    }
    currentPlayer.xIndex = (currentPlayer.xIndex + 1) % currentPlayer.cols;

    if (currentPlayer.xIndex >= currentPlayer.cols) {
        currentPlayer.xIndex = 0;
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

function RenderPlayer() {
    const sx = currentPlayer.xIndex * currentPlayer.spriteWidth;
    const sy = currentPlayer.yIndex * currentPlayer.spriteHeight;
    const sw = currentPlayer.spriteWidth;
    const sh = currentPlayer.spriteHeight;

    const x = currentPlayer.xPos;
    const y = currentPlayer.yPos;

    const dw = currentPlayer.spriteWidth;
    const dh = currentPlayer.spriteHeight;

    context.drawImage(playerImage, sx, sy, sw, sh, x, y, dw, dh);
}

function MovementLogic() {

    currentPlayer.xPos += currentPlayer.xVelocity;
    currentPlayer.yPos += currentPlayer.yVelocity;
    currentPlayer.xVelocity *= 0.8;
    currentPlayer.yVelocity *= 0.8;

    if (controller.left) {
        currentPlayer.yIndex = 3;
        currentPlayer.xVelocity -= 2;
    }

    else if (controller.right) {
        currentPlayer.yIndex = 1;
        currentPlayer.xVelocity += 2;
    }

    else {
        currentPlayer.yIndex = 0;
    }

    if (controller.up && currentPlayer.jump == false) {

        currentPlayer.yVelocity -= 50;
        currentPlayer.jump = true;
    }

    if (currentPlayer.yPos + currentPlayer.height >= canvas.height - 150) {
        currentPlayer.yPos = canvas.height - 125 - currentPlayer.height;
        currentPlayer.jump = false;
    }

    else {
        currentPlayer.yPos += 20;
    }

    if (currentPlayer.xPos + currentPlayer.width >= canvas.width) {
        currentPlayer.xPos = canvas.width - currentPlayer.width;
    }

    if (currentPlayer.xPos - currentPlayer.width <= 0) {
        currentPlayer.xPos = 0 + currentPlayer.width;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(backgroundImage, 0, 0, innerWidth, innerHeight);

    PlayAnimation();
    RenderPlayer();

    requestAnimationFrame(MovementLogic);
}

addEventListener("keydown", controller.keyListener);
addEventListener("keyup", controller.keyListener);



















