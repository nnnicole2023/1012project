//the variables：
let sequence = [];
let playerInput =[];
let attemptsLeft = 3; 
let score = 0;
let final_score = 0;
//these 2 lines : need to work with P
let currentShapes = 0;
let boardScore = 0;
const shapes = document.querySelectorAll('.triangle, .square, .circle');
const scoreDisplay = document.getElementById("score-display");//!!!
const attemptsDisplay = document.getElementById("attempts-display"); //!!!! 
const message = document.getElementById('message');

document.addEventListener("DOMContentLoaded", () =>{
    try{const startButton = document.getElementById("startButton"); 
    startButton.addEventListener("click", startGame);} 
    catch(error) {}; //Ignores error on other pages//
});


//main part
shapes.forEach((shape) => {
    shape.addEventListener("click", (event) => {
        const clickedShape = event.target.className.split(" ")[0]; // the graph clicked
        playerInput.push(clickedShape); // add playerinput
        highlightShape(clickedShape); // highlight player clicks

        //wrong answer:
        if (!check()){
            attemptsLeft--;
            // attemptsDisplay.textContent = `Attempts Left: ${attemptsLeft}`; // update it
            //!!!!!!!!!!注意
            updateAttempts();

            if (attemptsLeft <= 0) {
                message.textContent ="Game Over";
                setTimeout(() => {
                    window.location.href = "gameOver.html"; // go to gameOver.html
                }, 800);
                // !!!!!!GO To GAME OVER PAGE
                stopStopWatch(); //Stops watch and updates textarea on gameover//
                final_score = document.getElementById("score-display").innerText;
                final_score = final_score.replace("Score: ", "").trim(); //extracting number from score//
                scoreForBoard =
                sessionStorage.setItem("scoreFinal", final_score);  
                boardScore = final_score.match(/\d+/)[0];

                const playerName = localStorage.getItem('playerName');
                if (playerName) {
                    updatePlayerScore(playerName, boardScore); 
                }
                
                return;
                
            }

            message.textContent = "Wrong!";         
            playerInput=[];

            setTimeout (() => {
                message.textContent = "Display again";
            }, 500);
            setTimeout (() => {
                displaySequence();

            }, 1000);
            return;
        }
        //bingo
        if (playerInput.length === sequence.slice(-currentShapes).length){
            score = score + currentShapes;
            scoreDisplay.textContent =`Score:${score}`;
            setTimeout (() => {
                message.textContent = "Bingo!";
            }, 200);
            setTimeout (() => {
                message.textContent = "Another round";
                round();
            }, 1000);
        }
    });
});

// all the functions we need 
//
function generateNextShape() {
    const randomShapeElement = shapes[Math.floor(Math.random() * 3)]; //3:length of shapes
    const randomShapeClass = randomShapeElement.className.split(" ")[0];
    //randomShapeElement： could be 'circle' OR 'square' OR 'triangle'
    sequence.push(randomShapeClass);
    //！！！！！！！HERE WE USE sequence！！！！！！！
  }

//function to highlight
function highlightShape(shapeClass) {
    console.log(`Highlighting shape: ${shapeClass}`);
    //check！
    const shapeElement = document.querySelector(`.${shapeClass}`); // choose graph
    shapeElement.classList.add("highlight"); // highligh
    setTimeout(() => shapeElement.classList.remove("highlight"), 500); // 500ms later, remove highlight
  }

function displaySequence() {
    const displayShapes = sequence.slice(-currentShapes); // get the graphs for this round
    displayShapes.forEach((shape, index) => {
        setTimeout(() => highlightShape(shape), index * 1000); // 
    });
    setTimeout(()=>{
        message.textContent ="Your turn! Repeat the sequence";
    },displayShapes.length * 1000)
}

//function to reset
function startGame(){
    startButton.style.display = "none";
    sequence = []; //reset
    playerInput = []; //reset
    score = 0; //reset
    attemptsLeft = 3; //reset
    currentShapes = 0; //reset

    scoreDisplay.textContent = `Score: ${score}`; // update score!!!work with P
    attemptsDisplay.textContent = `Attempts Left: ${attemptsLeft}`; 
    // update attempts!!!work with P

    message.textContent ="Game Started";

    //first round
    round();
}

function round(){
    playerInput=[];
    if (currentShapes < 10){ //10:limit
        currentShapes++; //difficulty control
    }
    for(let i=0;i<currentShapes;i++){
        generateNextShape(); //we push new ones into sequence
    }
    setTimeout (() => {
        displaySequence();
    }, 700);
}

//return true if player's input in right
function check(){
    for(let i=0;i<playerInput.length;i++){
        if( playerInput[i] !== sequence.slice(-currentShapes)[i]){
            return false;
        }
    }
    return true;
}


//Timer code//
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
    complete_time = document.getElementById("stopwatch").innerText;
    sessionStorage.setItem("finalTime", complete_time); 
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

//music functions//

function play() {
    var audio = new Audio('/Soundfiles/14_GBA_Snow_Land.m4a');
    audio.loop = true; 
    audio.play(); 
}

//Function to check if player is on game over page//
//If yes, plays losing music upon event interaction. The reason why music doesn't play onload of webpage is due to browser restrictions//
function check_location() {
    
    if (window.location.pathname === '/gameOver.html') {
        console.log("check_location()")
        let myaudio = new Audio( "/Soundfiles/padawan.mp3"); 
        myaudio.loop = true; 
        document.addEventListener('mousedown', function () {
            myaudio.play();
});
    };
}; 

window.onload = check_location;

function updateAttempts() {
    attemptsDisplay.textContent = `Attempts Left: ${attemptsLeft}`;
    
    // Check if there is 1 attempt left and add the border
    if (attemptsLeft === 1) {
        document.querySelector('.graphs').classList.add('bordered'); // Add border
    } else {
        document.querySelector('.graphs').classList.remove('bordered'); // Remove border
    }
}
