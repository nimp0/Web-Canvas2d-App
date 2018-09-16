var canvas = document.querySelector("canvas");
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var xPos = 0;
var xSpeed = 20;
var yPos = 595;
var ySpeed = 300;
var jump = false;
var right = false;
var left = false;
var fall = 5

RenderPicture();
//Falling();

addEventListener("keydown", (e) => {
    
    if (e.key == "ArrowRight") {
        right = true;
        xPos += xSpeed;
    }
    if (e.key == "ArrowLeft") {
        left = true;
        xPos -= xSpeed;
    }
    if (jump == false && e.key == " ") {
        jump = true;
        yPos -= ySpeed;
        Falling();
    }
    AnimatePicture();
});

/*addEventListener("keyup", (e) => {
    if (e.key == "ArrowRight") {
        right = false;
    }
    if (e.key == "ArrowLeft") {
        left = false;
    }
    AnimatePicture();
})*/

function Falling() {
    requestAnimationFrame(Falling);
    RenderPicture();
    if (jump == true) {
        if (yPos + hero.height / 10 >= canvas.height) {
            yPos = canvas.height - hero.height / 10;
            jump = false;
        }
        else {
            yPos += fall;
        }
    }
}

function AnimatePicture() {
    requestAnimationFrame(AnimatePicture);
    RenderPicture();
}

function RenderPicture() {

    hero = new Image();
    hero.src = "pictures/hero.png";
    hero.onload = function () {
        context.clearRect(0, 0, innerWidth, innerHeight);
        context.beginPath();
        context.drawImage(hero, xPos, yPos, hero.width / 10, hero.height / 10);
        context.stroke();
    }
}










    




