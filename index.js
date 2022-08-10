var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

//------------------------------------------------------------------------
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//------------------------------------------------------------------------

var started = false;
var level = 0;

//------------------------------------------------------------------------

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  play(randomChosenColour);
  animatePress(randomChosenColour);
}

//------------------------------------------------------------------------ ses çalma renge göre

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//------------------------------------------------------------------------ animasyon renge göre
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed ");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//------------------------------------------------------------------------ dokunduysa başlıyor

$(document).keypress(function () {
  if (!started && level === 0) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//------------------------------------------------------------------------

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success.");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    } else {
      console.log("falseee eheh");
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 250);

    $("h1").text(
      `Game over, your score was ${level - 1}! Press any key to restart :(`
    );
    started = false;
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
  }
}
