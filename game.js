
var buttonColors = ["red", "blue", "green", "yellow"]

//game sequence
var gamePattern = [];

//user answer
var userClickedPattern = [];

//started variable to know if keypressed activated once.
var started = false;

//level starts at zero before game starts
var level = 0;


//determine next sequence 
function nextSequence(){
    // Once nextSequence() is triggered, reset the userClickedPattern 
    // to an empty array ready for the next level.
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    
}


//add click event listener & User answers
$(".btn").click(function(){
    var userChosenColor =this.getAttribute("id"); // or $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    //****deprecated ***console.log(userChosenColor);
    animationPress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
    
})

//plays sound whenever a button is clicked or computer generated
function playSound(name){
    
    var audio = new Audio('sounds/'+name + '.mp3');
    audio.play();


}

//animation function to user clicks
function animationPress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);



}

//game start when user press a key on keyboard
$(document).keypress(function(){

if(!started){
    $("#level-title").text("Level " + level);   
    started = true;
    nextSequence(); 
}

})

//for mobile devices to play
$(document).on("touchstart",function(){

    if(!started){
        $("#level-title").text("Level " + level);   
        started = true;
        nextSequence(); 
    }
    
    })




function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        // console.log("success");
        if(userClickedPattern.length === gamePattern.length ){       
           setTimeout(function(){nextSequence();},1000) ;
           
        }

    }  

    else{
        // console.log("fail");
        var wrongSound = new Audio('sounds/wrong.mp3')
        wrongSound.play();

        $("body").addClass("game-over");
        $("#level-title").text("You Loser! Try Again! Press any key to restart.");

        setTimeout(function(){
            $("body").removeClass("game-over");},200);

        
        startOver();
    }
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;


}

