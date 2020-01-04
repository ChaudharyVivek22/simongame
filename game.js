var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

//Detect Keypress for the first time only
$(document).keypress(function (){
    if(!started)
    { $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

//Detect user clicks and update userClickedPattern and animate the cicked button
$(".btn").click(function (){
     var userInput = $(this).attr('id');
     console.log(handler(userInput));
     playsound(userInput);
     animateButtonPress(userInput);     
     //Call to check answer
     checkAnswer(userClickedPattern.length-1);
});

//function to animate button of chosen color and play sound
function btnanimate(randomChosenColor){
     $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
     playsound(randomChosenColor);
}

//function to display next random color and store in in gamepattern array
function nextSequence(){
     level++;
     $("#level-title").text("Level " + level);
     userClickedPattern=[];
     var randnum = Math.floor(Math.random()*4);
     var randomChosenColor = buttonColours[randnum];
     gamePattern.push(randomChosenColor);
     btnanimate(randomChosenColor);
}

//Function to playsound
function playsound(name){
     var playaudio = new Audio("sounds/"+name+".mp3");
     playaudio.play();
}

//To animate buttonPress
function animateButtonPress(buttonClicked){
     $("#"+buttonClicked).addClass("pressed");
     setTimeout(function (){
          $("#"+buttonClicked).removeClass("pressed");
     },100);
}

//Function to update userClickedPattern
function handler(buttonClicked){
     userClickedPattern.push(buttonClicked);
     return userClickedPattern;
}

//Check answer
function checkAnswer(currentLevel){
     if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
          console.log("success");
          if(gamePattern.length===userClickedPattern.length)
          {
               setTimeout(function(){
                    nextSequence();
               },1000);
          }
     }
     else{
          $("#level-title").text("Game Over. Press any key to continue");
          $("body").addClass("game-over");
          playsound("wrong");
          setTimeout(function(){
               $("body").removeClass("game-over");
          },100);
          startOver();
     }
}

//To start over the game
function startOver(){
     level=0;
     gamePattern=[];
     started=false;
     
}