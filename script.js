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
const Player = (marker) => {
    const getMarker = () => marker;
    const makeMove = (e) => {
        const move = parseInt(e);
        gameBoard.boardArray[move] = marker;
        console.log(move);
        

    };
    return {getMarker,makeMove}
}
  
const gameController = (() => {
    
    let turn = true;
    gameBoard.displayBoard();
    const boardSections = document.querySelectorAll('.board-section');
    const playerX = Player('x');
    const playerO = Player('o');
    
    const playerTurn = () => {
        if(turn){
            
            return playerX
        }else{
            
            return playerO
        }
    };

    const playRound = (section) => {
        const data = parseInt(section.dataset.place);

        //
        if(gameBoard.boardArray[data] !== "") return
        const player = gameController.playerTurn();
        turn = !turn;
        player.makeMove(data);
        section.innerHTML = player.getMarker();
        console.log(gameBoard.boardArray);
        
        
        
    };
    boardSections.forEach((section) => {
        section.addEventListener('click',() => {
            playRound(section);

            
        });
    });
    //console.log(player1.getMarker())
    //console.log(player1.makeMove())
    return {turn,playerTurn}

})();





