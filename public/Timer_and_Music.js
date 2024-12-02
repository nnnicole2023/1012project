//Test file for timer and music functions//
//Timer Functions//

var start; 
var interval; 
var elapsed_paused_time = 0; 
var complete_time = ""; 

function startStopWatch() { //To start stopwatch// 
    if (!interval) {
        start = new Date().getTime() - elapsed_paused_time;
        interval = setInterval(updateStopwatch, 1000); 
    };
};

function stopStopWatch() { //To stop stopwatch// 
   if(interval) {
    clearInterval(interval); 
    elapsed_paused_time = new Date().getTime() - start; 
    interval = null; 
    complete_time = document.getElementById("stopwatch").innerHTML;
    console.log("Final time: ", complete_time); //Logging final time in console//
    document.getElementById("score").innerHTML = complete_time; //Score time displayed//
    };  
};

function resetStopWatch() { //To reset stopwatch//
    stopStopWatch(); 
    elapsed_paused_time = 0; 
    document.getElementById("stopwatch").innerHTML = "00:00:00"; 
};

function updateStopwatch() { //To update stopwatch//
    var current_time = new Date().getTime(); 
    var elapsed_time = current_time - start; 
    var seconds = (Math.floor(elapsed_time/1000) % 60); 
    var minutes = (Math.floor(elapsed_time/1000/60) % 60);
    var hours = (Math.floor(elapsed_time/1000/60/60));
    var display_time = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds); 
    document.getElementById("stopwatch").innerHTML = display_time;
};

function pad(number) { //For leading numbers//
    return (number < 10 ? "0" : "") + number; 
};



//Music Functions//

//Plays audio on button click// 
//Placeholder music:https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3//

//Infinitely loops game soundtrack upon start of game//
function play() {
    var audio = new Audio('/Soundfiles/14_GBA_Snow_Land.m4a');
    audio.loop = true; 
    audio.play(); 
}

//Looping game over music on game over page. Has to trigger with user interaction due to browser restrictions//
// let myaudio = new Audio(); 
// myaudio.src = "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";
// myaudio.loop = true; 

// document.addEventListener('mousedown', function () {
//     myaudio.play();
//     });





