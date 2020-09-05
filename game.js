
var randomChosenColor = [];
var userClickedPattern = [];
var isClicked = true;
var level = 0;

function generateRandomNumber() {
    var randomNumber = Math.floor(Math.random() * 4);
    var buttonColors = ["green", "red", "yellow", "blue"];
    var color = buttonColors[randomNumber];
    randomChosenColor.push(color);

    $("#" + color).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
    level++;
    $("#level-title").text("level " + level);
    userClickedPattern = [];

}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    if (randomChosenColor[currentLevel] === userClickedPattern[currentLevel]) {
        if (level === currentLevel + 1) {
            setTimeout(() => {
                generateRandomNumber();
            }, 1000);
        }
    } else {
        new Audio("sounds/wrong.mp3").play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        randomChosenColor = [];
        userClickedPattern = [];
        isClicked = true;
        level = 0;
        $("h1").text("Game Over! Press Any Key to restart");
    }
}

$(document).keypress(function (e) {
    if (isClicked) {
        $("#level-title").text("level " + level);
        generateRandomNumber();
        isClicked = false;
    }

});


$("button, div[type = 'button']").click(function () {
    var color = this.id;
    userClickedPattern.push(color);
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
    animatePress(color);
    checkAnswer(userClickedPattern.length - 1);

});




