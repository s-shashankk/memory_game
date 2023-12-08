//empty array to store specified colors
var gamePattern = [];
//array to store all colors
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

// started is set to false
//because it is used to check whether the game has started or not. When the user presses a key for the first time, the keypress event listener is triggered, and the started variable is checked. If it is false, it means that the game has not started yet,
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
    if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
    //$(this) refers to the current element that triggered the event, 
    //attr returns the value of the "id" attribute of the element.
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
  });
  
//creating function to checking answer
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
              }, 1000);
            }
          } else {
            playSound("wrong");
         //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
         $("body").addClass("game-over");

        //changing the text after game over...
        $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

       
        //2. Call startOver() if the user gets the sequence wrong.
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    // random number generating
    var randomNumber = Math.floor(Math.random() * 4);
    // we have 4 colors so shd get 0,1,2,3 numbers
   
    //roundoff random number to whole number

    //storing random color using random_number inside randomcolorchosen ,single color is stored here
    var randomChosenColour = buttonColours[randomNumber];
    //pushing that stored color in randomcolorchosen inside gamnepattern array
    gamePattern.push(randomChosenColour);


    //choosing random color as selector to make it as flash
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
    
    // new userdefined function is created called-animatepress
    function animatePress(currentColor) {


       //
       $("#" + currentColor).addClass("pressed");
      
      // setTimeout is an inbuilt  function in js which take 2 arguments ,1-funnction ,,2-time interval
      setTimeout(function () {
            //properties of class is removed after few seconds
            $("#" + currentColor).removeClass("pressed");
        }, 100);
      }
    //using that audio when ever you press color
    function playSound(name) {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
      }
    
    //1. Create a new function called startOver().
    function startOver() {
    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }
  
  
  
