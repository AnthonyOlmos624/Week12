//API endooint
const apiUrl = 'http://localhost:3000/games';

// need a function to fetch the games from API

async function fetchGames(){
    try{
        const response = await fetch(apiUrl);
        const games = await response.json();
        displayGames(games)
    } catch (error){
        console.error('Error fetching games:', error);
    }
}

//Create a function to display games
function displayGames(games){
    const gameList = document.getElementById('gameList');
    gameList.innerHTML = ''; //need to clear list before rendering

    games.forEach(game => {
        const li = document.createElement('li');
        li.className = 'list-group-item game';
        li.innerHTML = `
        <strong>${game.title}</strong> - ${game.genre}
        <button class="btn btn-danger btn-sm float-end" onclick="deleteGame(${game.id})">Delete</button>
        `; 
        gameList.appendChild(li); 
    })
}
// Having issues in this location when a game is added the id would add letters and numbers to it which will not let me delete the game due to the id not being in numerical order i am assuming. Couldnt find a way to fix this issue. =(   
//Create a function to add new game via POST
async function addGame(game){
    try{
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(game)
        });
        const newGame = await response.json();
        fetchGames(); //need this to refresh the game list after adding new game
    } catch(error){
        console.error('Error adding game:', error);
    }
}

// Make a function to delete game via DELETE
async function deleteGame(id) {
    try { 
        await fetch(`${apiUrl}/${id}`,{
            method: 'DELETE'
        });
        fetchGames(); //should refresh game list after deleting
    } catch (error) {
        console.error('Error deleting game:', error);
    }
}


//Make event listeners for the form submission
document.getElementById('gameForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;

    // Create game object and add to API
    const newGame = { title, genre};
    addGame(newGame);
    
    //Need the form fields to clear after submission
    document.getElementById('title').value = '';
    document.getElementById('genre').value = '';
});

// Need to fetch games when page loads
window.onload = fetchGames; 
