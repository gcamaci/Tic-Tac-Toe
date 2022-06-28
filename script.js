
//IIFE Displays game board 

const gameBoard = (() => {
    const board = document.getElementById('game-board');
    let boardArray = ["","","","","","","","",""];
    for (let i = 0; i < boardArray.length; i++){
        const boardSection = document.createElement('div');
        boardSection.classList.add('board-section');
        boardSection.dataset.place = i;
        board.appendChild(boardSection);
    }

    
    return{boardArray}

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
    const start = document.getElementById('start-game');
    const tag = document.getElementById('tag');
    let turn = true;
    let game =true;
    const boardSections = document.querySelectorAll('.board-section');
    const playerX = Player('X');
    const playerO = Player('O');
    let opp = 'player';

    const toggleOpp = (enemy) => {
        const playerOpp = document.querySelector('.opp-player');
        const compOpp = document.querySelector('.opp-computer');
    
        if(enemy === 'player'){
            opp = 'player';
            playerOpp.style.backgroundColor = 'var(--header-hover)'
            compOpp.style.backgroundColor =  'var(--color-secondary-bkg)'
        }else{
            opp = 'computer';
            playerOpp.style.backgroundColor = 'var(--color-secondary-bkg)'
            compOpp.style.backgroundColor = 'var(--header-hover)'
        }
        

    };
    //decides whos turn it is. 
    const playerTurn = () => {
       if(turn){
        return playerX
        }else{
        return playerO;
        } 
    };

    const computerBrain = () =>{
        let compChoices = []
        gameBoard.boardArray.forEach((choice,index)=> {
            if(choice === ''){
                compChoices.push(index);
            }
        });
        let random = Math.floor(Math.random() * compChoices.length);
        if(gameBoard.boardArray[compChoices[random]]===''){
            playerO.makeMove(compChoices[random]);
            boardSections[compChoices[random]].innerHTML = playerO.getMarker();
            boardSections[compChoices[random]].style.color = 'var(--second-hover)'
            
        }
    }
    
    const checkWinner = (player) => {
        
        if(gameBoard.boardArray.indexOf('') === -1 && game === true){
            console.log('TIE')
            tag.innerHTML = 'TIE!'
           
        }
        winningNums.forEach((show)=>{
            if(gameBoard.boardArray[show[0]] === player.getMarker() 
            && gameBoard.boardArray[show[1]] ===player.getMarker() 
            && gameBoard.boardArray[show[2]] === player.getMarker()){
           
                game = false;

                boardSections[show[0]].style.backgroundColor = 'pink';
                boardSections[show[1]].style.backgroundColor = 'pink';
                boardSections[show[2]].style.backgroundColor = 'pink';
                tag.innerHTML = `Player: ${player.getMarker()} wins!!!`
            }
            
           
        }); 

    };

    //gets the data attribute from DOM and places players marker in correct index of display array
    //determines which players turn it is, checks if choice already taken
    const playRound = (section) => {
        let player = gameController.playerTurn();
        const data = parseInt(section.dataset.place); 
        
        if(game === true && opp === 'player'){
            if(gameBoard.boardArray[data] !== "") return
            turn = !turn;
            player.makeMove(data);
            section.innerHTML = player.getMarker();
            if(player.getMarker()==='X'){
                tag.innerHTML = "Player O's Turn";
                section.style.color = 'var(--header-hover)'   
            }
            else{
                tag.innerHTML = "Player X's Turn";
                section.style.color = 'var(--second-hover)'
            }
            checkWinner(playerX)
            checkWinner(playerO)
        }

        if(game === true && opp === 'computer'){
            if(gameBoard.boardArray[data] !== "") return
            turn = true;
            player.makeMove(data);
            section.innerHTML = player.getMarker();
            section.style.color = 'var(--header-hover)';
            
            checkWinner(playerX)
            if(game === true){
                setTimeout(computerBrain,1000);
                // computerBrain();
                checkWinner(playerO)
            }
        }
    };

    const resetGame = () => {
        gameBoard.boardArray = ["","","","","","","","",""];
        game = true;
        turn = true;
        boardSections.forEach((section) => {
            section.innerHTML = "";
            section.style.backgroundColor = 'var(--color-secondary-bkg)'
        });
        tag.innerHTML = "Player X's Turn"
        console.log(game)
        console.log(gameBoard.boardArray)
        
    };

    reset.addEventListener('click',resetGame);


    boardSections.forEach((section) => {
        section.addEventListener('click',() => {
            playRound(section);
        });
        section.addEventListener('mouseover',()=>{
            if(turn){
                section.style.border = '3px solid var(--header-hover)';
            }
            else{
                section.style.border = '3px solid var(--second-hover)';
            }
        });
        section.addEventListener('mouseout', ()=>{
            section.style.border = 'none'

        });
        
    });

    const opps = document.querySelectorAll('.opp');
    opps.forEach((opponent) => {
        opponent.addEventListener('click',() =>{
            toggleOpp(opponent.dataset.opp)
        });
        
    });

    

    start.addEventListener('click', () =>{
        const header = document.querySelector('header');
        header.style.display = "none";
    });
    
    return {opp,turn,playerTurn,computerBrain}

})();



 





