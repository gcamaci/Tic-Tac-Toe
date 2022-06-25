
//IIFE Displays game board 

const gameBoard = (() => {
    const board = document.getElementById('game-board');
    let boardArray = ["","","","","","","","",""];
    const displayBoard = () => {
        for (let i = 0; i <= boardArray.length; i++){
            const boardSection = document.createElement('div');
            boardSection.classList.add('board-section');
            boardSection.dataset.place = i;
            board.appendChild(boardSection);
        }
    }
    return{boardArray, displayBoard}

})();
/*
set functions for player objects 
*/
const Player = (marker) => {
    const getMarker = () => marker;
    const makeMove = (e) => {
        const move = parseInt(e);
        gameBoard.boardArray[move] = marker;
        //console.log(move);
    };

    return {getMarker,makeMove}
}
  
const gameController = (() => {
    const winningNums = [[0,4,8],[0,1,2],[0,3,6],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]];
    const reset = document.getElementById('reset');
    //console.log(winningNums)
    //let turn = true;
    let game =true;
    gameBoard.displayBoard();
    const boardSections = document.querySelectorAll('.board-section');
    const playerX = Player('x');
    const playerO = Player('o');
    //decides whos turn it is. 
    /*
    const playerTurn = () => {
        if(turn){
            
            return playerX
        }else{
            
            return playerO
        }
    };
    */


    //gets the data attribute from DOM and places players marker in correct index of display array
    //determines which players turn it is, checks if choice already taken
    const playRound = (section) => {
        //const player = gameController.playerTurn();
        const data = parseInt(section.dataset.place);  
        if(game === true){
            if(gameBoard.boardArray[data] !== "") return
            //turn = !turn;
            playerX.makeMove(data);
            section.innerHTML = playerX.getMarker();


            if(gameBoard.boardArray.indexOf('') === -1){
                console.log('TIE')
    
            }
            winningNums.forEach((show)=>{
            
                if(gameBoard.boardArray[show[0]] === player.getMarker() 
                && gameBoard.boardArray[show[1]] ===player.getMarker() 
                && gameBoard.boardArray[show[2]] === player.getMarker() ){
                console.log(`these match ${show}`)
                console.log(`Player: ${player.getMarker()} wins!!!`)
                game = false;
                }
    
            });  

        }
    
      
    };

    const resetGame = () => {
        gameBoard.boardArray = ["","","","","","","","",""];
        game = true;
        boardSections.forEach((section) => {
            section.innerHTML = "";
        });
        console.log(game)
        console.log(gameBoard.boardArray)

    };


    reset.addEventListener('click',resetGame)


    boardSections.forEach((section) => {
        section.addEventListener('click',() => {
            playRound(section);
            

            
        });
    });
    
    return {turn,playerTurn}

})();



 





