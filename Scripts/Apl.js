var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const playerKey = "player";
const enemyKey = "enemy";

const playerData = {
    unitCurrAnimFrame: 0,
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

const enemyData = {
    unitCurrAnimFrame: 0,
    xPos: 600,
    yPos: 240,
    xVelocity: 0,
    yVelocity: 0,
    height: 70,
    width: 60,
    //jump: true,

    xIndex: 0,
    yIndex: 0,
    cols: 10,
    rows: 1,
    spriteWidth: 200,
    spriteHeight: 312,
}

function CreateUnitData(unitKey) {
    if (unitKey == playerKey) {
        return { ...playerData };
    }
    if (unitKey == enemyKey) {
        return { ...enemyData }
    }
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
let enemyImage = null;

const assetStateData = {
    "Pictures/background.png": null,
    "Pictures/trump.png": null,
    "Pictures/walkingdead.png": null
};

let player = CreateUnitData(playerKey);
let enemy = CreateUnitData(enemyKey);
console.log(player);
console.log(enemy);

ON_ALL_ASSETS_LOADED = () => {
    backgroundImage = assetStateData["Pictures/background.png"];
    playerImage = assetStateData["Pictures/trump.png"];
    enemyImage = assetStateData["Pictures/walkingdead.png"]
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

function PlayAnimation(unit) {
    if ((++unit.unitCurrAnimFrame) % 10 > 0) {
        return;
    }
    unit.xIndex = (unit.xIndex + 1) % unit.cols;

    if (unit.xIndex >= unit.cols) {
        unit.xIndex = 0;
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

function Render(unit, unitImage) {
    const sx = unit.xIndex * unit.spriteWidth;
    const sy = unit.yIndex * unit.spriteHeight;
    const sw = unit.spriteWidth;
    const sh = unit.spriteHeight;

    const x = unit.xPos;
    const y = unit.yPos;

    const dw = unit.spriteWidth;
    const dh = unit.spriteHeight;

    context.drawImage(unitImage, sx, sy, sw, sh, x, y, dw, dh);
}

function MovementLogic() {

    player.xPos += player.xVelocity;
    player.yPos += player.yVelocity;
    player.xVelocity *= 0.8;
    player.yVelocity *= 0.8;
    enemy.xPos -= 2;

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

    if (controller.up && player.jump == false) {

        player.yVelocity -= 50;
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

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(backgroundImage, 0, 0, innerWidth, innerHeight);

    PlayAnimation(player);
    PlayAnimation(enemy);

    Render(player, playerImage);
    Render(enemy, enemyImage);

    requestAnimationFrame(MovementLogic);
}

addEventListener("keydown", controller.keyListener);
addEventListener("keyup", controller.keyListener);



















