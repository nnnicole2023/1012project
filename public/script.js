
function addPlayerData(playerName, score) {
    const tableBody = document.getElementById('scoreTableBody'); 

    const row = document.createElement('tr');
    const playerNameCell = document.createElement('td');
    const scoreCell = document.createElement('td');

    playerNameCell.textContent = playerName;
   
    scoreCell.textContent = score || 'N/A'; 

    row.appendChild(playerNameCell);
   
    row.appendChild(scoreCell);

    tableBody.appendChild(row);
}


function savePlayerName() {
    const playerName = document.getElementById('playerName').value;
    if (playerName) {
       
        const score = ''; // Placeholder score
        
        const playerName = document.getElementById('playerName').value; //To access username from home page and print it on the game and game over page//
        addPlayerData(playerName, score); 
        localStorage.setItem('playerName', playerName);
        localStorage.setItem(playerName, JSON.stringify({ score }));
        document.getElementById('playerName').value = ''; 
    } else {
        alert("Please enter a player name.");
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    const storedData = Object.keys(localStorage);

    storedData.forEach(playerName => {
        const { score } = JSON.parse(localStorage.getItem(playerName));
        addPlayerData(playerName, score);
    });
});


function updatePlayerScore(playerName, newScore) {
    const storedData = JSON.parse(localStorage.getItem(playerName));
    if (storedData) {
        storedData.score = newScore; 
        localStorage.setItem(playerName, JSON.stringify(storedData)); 
        
        const tableBody = document.getElementById('scoreTableBody');
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells[0].textContent === playerName) {
                cells[1].textContent = newScore; 
            }
        });
    }
}

// Function to restart the game and clear the table
function restartPlayer() {
    // Clear all rows in the scoreboard
    const tableBody = document.getElementById('scoreTableBody');
    tableBody.innerHTML = ''; // This clears all rows

    // Clear input field to allow re-entry of player name
    document.getElementById('playerName').value = '';

    // Optionally, clear localStorage (if you want to start fresh every time)
    localStorage.clear(); // Remove all data from localStorage (uncomment if needed)
}



