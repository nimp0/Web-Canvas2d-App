var canvas = document.querySelector("canvas");
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("keydown", function () {
    AnimatePicture();
})
function keyDownTextField(d) {
    var keyCode = d.keyCode;
}
var xSpeed = 2;
var xPos = 0;
function AnimatePicture() {
    requestAnimationFrame(AnimatePicture);
    
    image = new Image();
    image.src = "https://supermariorun.com/assets/img/hero/hero_chara_mario_update_pc.png";
    image.onload = function () {
        context.clearRect(0, 0, innerWidth, innerHeight);
        context.beginPath();
        context.drawImage(image, xPos, canvas.height - image.height / 10, image.width / 10, image.height / 10);
        context.stroke();
        xPos += xSpeed;
    }
}



    




