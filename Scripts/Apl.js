var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const DEFAULT_PLAYER_DATA = {
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
    return {...DEFAULT_PLAYER_DATA };
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

let GLOBAL_BACKGROUND_IMAGE = null;
let GLOBAL_PLAYER_IMAGE = null;

const ASSET_STATE_DATA = {
    "Pictures/background.png": null,
    "Pictures/trump.png": null
};

let currentPlayer = CreatePlayerData();
console.log(currentPlayer);

ON_ALL_ASSETS_LOADED = () => {
    GLOBAL_BACKGROUND_IMAGE = ASSET_STATE_DATA["Pictures/background.png"];
    GLOBAL_PLAYER_IMAGE = ASSET_STATE_DATA["Pictures/trump.png"];
    requestAnimationFrame(MovementLogic);
};

function AreAllAssetsLoaded() {
    let result = true;
    for (let k in ASSET_STATE_DATA) {
        if (!ASSET_STATE_DATA[k]) {
            result = false;
            break;
        }
    }

    return result;
}

function InitializeAssets() {
    const resolver = ({ image, url }) => {
        ASSET_STATE_DATA[url] = image;
        const isThisAll = AreAllAssetsLoaded();
        if (isThisAll) {
            ON_ALL_ASSETS_LOADED();
        }
    };

    for (let k in ASSET_STATE_DATA) {
        LoadImg(k).then(resolver);
    }
}

InitializeAssets();

let currentPlayerAnimationFrame = 0;
function PlayAnimation() {
    if ((++currentPlayerAnimationFrame) % 10 > 0) {
        return;
    }
    //context.clearRect(0, 0, spriteWidth, spriteHeight);
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

    context.drawImage(GLOBAL_PLAYER_IMAGE, sx, sy, sw, sh, x, y, dw, dh);
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

    if (currentPlayer.xPos + currentPlayer.width >= currentPlayer.width) {
        currentPlayer.xPos = currentPlayer.width - currentPlayer.width;
    }

    if (currentPlayer.xPos - currentPlayer.width <= 0) {
        currentPlayer.xPos = 0 + currentPlayer.width;
    }
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(GLOBAL_BACKGROUND_IMAGE, 0, 0, innerWidth, innerHeight);

    PlayAnimation();
    RenderPlayer();

    requestAnimationFrame(MovementLogic);
}

addEventListener("keydown", controller.keyListener);
addEventListener("keyup", controller.keyListener);



















