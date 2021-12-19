const gameboard = {
    state: [["E", "E", "E"],["E", "E", "E"],["E", "E", "E"]],
    initialState: [["E", "E", "E"],["E", "E", "E"],["E", "E", "E"]],
    mode: "pvp",
    p1Mode: "pvp",
    p2Mode: "pvp",
    aiTurn: true,
    winner: "",
    gamesPlayed: 0,
}

let tim;
let jim;

const controller = (()=>{
    const displayContainer = document.querySelector(".displayContainer")
    
    const createGameBoardState = () => {
        squares = document.querySelectorAll(".square")
        let array = []
        let newState = []
        squares.forEach(square => {
            if(square.getAttribute("src")==="blank.png"){
                array = array.concat("E")
            }
            else if(square.getAttribute("src")==="circle.png"){
                array = array.concat("O")
            }
            else{
                array = array.concat("X")
            } 
        })
        for(let i=0; i<array.length;i=i+3){
            let row = array.slice(i,i+3)
            newState.push(row)
        }
        gameboard.state= newState
        return gameboard.state
    }

    const gameChecker = (p1,p2) => {
        squares = document.querySelectorAll(".square")
        let array = []
        squares.forEach(square => {
            if(square.getAttribute("src")==="blank.png"){
                array = array.concat("E")
            }
            else if(square.getAttribute("src")==="circle.png"){
                array = array.concat("O")
            }
            else{
                array = array.concat("X")
            } 
        })
        // first check horizontals and verticals
        for(let i=0; i<array.length;i=i+3){
            let row = array.slice(i,i+3)
            if(row.every(e=>e==="X")){
                displayContainer.textContent = `${tim.name} wins!`
                gameboard.winner = displayContainer.textContent
                return console.log(`${tim.name} wins!`)
            }
            else if(row.every(e=>e==="O")){
                displayContainer.textContent = `${jim.name} wins!`
                gameboard.winner = displayContainer.textContent
                return console.log(`${jim.name} wins!`)
            }
        }
        // then check verticals 
        for(let i=0; i<3;i++){
            let column = [array[i],array[i+3],array[i+6]]
            if(column.every(e=>e==="X")){
                displayContainer.textContent = `${tim.name} wins!`
                gameboard.winner = displayContainer.textContent
                return console.log(`${tim.name} wins!`)
            }
            else if(column.every(e=>e==="O")){
                displayContainer.textContent = `${jim.name} wins!`
                gameboard.winner = displayContainer.textContent
                return console.log(`${jim.name} wins!`)
            }
        }

        // then check diagonals
        let diag1 = [array[0],array[4],array[8]]
        let diag2 = [array[2],array[4],array[6]]
        if(diag1.every(e=>e==="X") || diag2.every(e=>e==="X")){
            displayContainer.textContent = `${tim.name} wins!`
            gameboard.winner = displayContainer.textContent
            return console.log(`${tim.name} wins!`)
        }
        else if(diag1.every(e=>e==="O") || diag2.every(e=>e==="O")){
            displayContainer.textContent = `${jim.name} wins!`
            gameboard.winner = displayContainer.textContent
            return console.log(`${jim.name} wins!`)
        }
        // check diagonals for draw
        if(array.includes("E")===false){
            displayContainer.textContent = "draw!"
            gameboard.winner = displayContainer.textContent
            return console.log("draw")
        }
    }
    

    // Passes turn if mark is created
    const passTurn = (isMarkCreated, jim, tim) => {
        if(isMarkCreated){
            jim.isTurn = !jim.isTurn
            tim.isTurn = !tim.isTurn
            gameChecker(jim,tim)
            console.log("p1 turn", jim.isTurn)
            switch(jim.isTurn){
                case true:
                    console.log("inside true")
                    switch(gameboard.p1Mode){
                        case "god":
                            console.log("inside god")
                            gameboard.aiTurn = true
                            ai.playBestMove()
                            break;
                        case "dumb":
                            console.log("inside dumb")
                            gameboard.aiTurn = true
                            ai.random()
                            break;
                        default: break; 
                    }
                    break;
                case false:
                    console.log("inside false")
                    switch(gameboard.p2Mode){
                        case "god":
                            console.log("inside god2")
                            gameboard.aiTurn = true
                            ai.playBestMove()
                            break;
                        case "dumb":
                            console.log("inside dumb2")
                            gameboard.aiTurn = true
                            ai.random()
                            break;
                        default: break; 
                    }
                    break;
            }
        }
    }

    // Create Board
    const createBoard = (jim, tim) => {
        gameboard.state=gameboard.initialState
        gameboard.state.map(row=>{
            for(let i=0;i < row.length;i++){
                const rowIndex = gameboard.state.indexOf(row)
                const positionToChange = document.querySelector(`[row="${rowIndex}"][col="${i}"]`)
                positionToChange.src="blank.png"
                if(gameboard.gamesPlayed===0){
                    positionToChange.addEventListener("click", ()=>{
                        if(gameboard.aiTurn === true){console.log("ai play")}
                        if(jim.isTurn){
                            const markCreated = jim.createMark(positionToChange)
                            passTurn(markCreated, jim, tim)
                        }
                        else{
                            const markCreated = tim.createMark(positionToChange)
                            passTurn(markCreated, jim, tim)
                        }
                    })
                } 
            }
         
    })
    gameboard.gamesPlayed++   
    }

    const startGame = () => {
        displayContainer.textContent=""
        gameboard.winner=""
        const p1= document.querySelector("#name1")
        const p2 = document.querySelector("#name2")
        if (gameboard.p1Mode != "pvp"){
            p1.value = gameboard.p1Mode + " AI 1"
        }
        if(gameboard.p2Mode != "pvp"){
            p2.value = gameboard.p2Mode + " AI 2"
        }

        if(gameboard.gamesPlayed===0){
            jim = Player(p1.value, 1)
            tim = Player(p2.value, 2)
        } 
        else{
            jim.name=p1.value
            tim.name=p2.value
        }

        jim.isTurn=true
        tim.isTurn=false
        controller.createBoard(jim, tim)
        console.log(gameboard.p1Mode, " vs ",gameboard.p2Mode)
        if (gameboard.p1Mode === "god"){
            gameboard.aiTurn=true
            ai.playBestMove()
        }
        else if(gameboard.p1Mode ==="dumb"){
            gameboard.aiTurn=true
            ai.random()
        }
    }

    
    return {
        createBoard, startGame, createGameBoardState
    }

})();

const Player = (name1, id1) => {
    let isTurn = false
    let id = id1
    let name = name1
    const sayName = () => name1
    const changeTurn = () => isTurn = !isTurn
    const createMark = (img) =>{
        if(img.getAttribute("src")!=="blank.png"){
            return false
        }
        else if(id===1){
            img.src="circle.png" 
            return true
        }
        else{
            img.src="cross.png"
            return true
        }
    }
    return {isTurn, name, changeTurn, createMark, sayName}
}

// ai select random empty square and clicks


const ai = (() => {
    const random = () => {
        if(gameboard.aiTurn === true && gameboard.winner.length < 1 ){
            let squares = document.querySelectorAll(".square")
            squares = Array.from(squares)
            squares = squares.filter(square => square.getAttribute("src") === "blank.png")
            const randomIndex = Math.floor(Math.random()*squares.length)
            squares[randomIndex].click("AI")
            gameboard.aiTurn = false
        }
    }

    class Move
    {
        constructor()
        {
            let row,col;
        }
    }
     
    let player = 'O', opponent = 'X';

    // This function returns true if there are moves
    // remaining on the board. It returns false if
    // there are no moves left to play.
    function isMovesLeft(board)
    {
        for(let i = 0; i < 3; i++)
            for(let j = 0; j < 3; j++)
                if (board[i][j] == 'E')
                    return true;
                     
        return false;
    }
     
    // This is the evaluation function as discussed
    // in the previous article ( http://goo.gl/sJgv68 )
    function evaluate(b)
    {
         
        // Checking for Rows for X or O victory.
        for(let row = 0; row < 3; row++)
        {
            if (b[row][0] == b[row][1] &&
                b[row][1] == b[row][2])
            {
                if (b[row][0] == player)
                    return +10;
                     
                else if (b[row][0] == opponent)
                    return -10;
            }
        }
      
        // Checking for Columns for X or O victory.
        for(let col = 0; col < 3; col++)
        {
            if (b[0][col] == b[1][col] &&
                b[1][col] == b[2][col])
            {
                if (b[0][col] == player)
                    return +10;
      
                else if (b[0][col] == opponent)
                    return -10;
            }
        }
      
        // Checking for Diagonals for X or O victory.
        if (b[0][0] == b[1][1] && b[1][1] == b[2][2])
        {
            if (b[0][0] == player)
                return +10;
                 
            else if (b[0][0] == opponent)
                return -10;
        }
      
        if (b[0][2] == b[1][1] &&
            b[1][1] == b[2][0])
        {
            if (b[0][2] == player)
                return +10;
                 
            else if (b[0][2] == opponent)
                return -10;
        }
      
        // Else if none of them have
        // won then return 0
        return 0;
    }
     
    // This is the minimax function. It
    // considers all the possible ways
    // the game can go and returns the
    // value of the board
    function minimax(board, depth, isMax)
    {
        let score = evaluate(board);
      
        // If Maximizer has won the game
        // return his/her evaluated score
        if (score == 10)
            return score;
      
        // If Minimizer has won the game
        // return his/her evaluated score
        if (score == -10)
            return score;
      
        // If there are no more moves and
        // no winner then it is a tie
        if (isMovesLeft(board) == false)
            return 0;
      
        // If this maximizer's move
        if (isMax)
        {
            let best = -1000;
      
            // Traverse all cells
            for(let i = 0; i < 3; i++)
            {
                for(let j = 0; j < 3; j++)
                {
                     
                    // Check if cell is empty
                    if (board[i][j]=='E')
                    {
                         
                        // Make the move
                        board[i][j] = player;
      
                        // Call minimax recursively
                        // and choose the maximum value
                        best = Math.max(best, minimax(board,
                                        depth + 1, !isMax));
      
                        // Undo the move
                        board[i][j] = 'E';
                    }
                }
            }
            return best;
        }
      
        // If this minimizer's move
        else
        {
            let best = 1000;
      
            // Traverse all cells
            for(let i = 0; i < 3; i++)
            {
                for(let j = 0; j < 3; j++)
                {
                     
                    // Check if cell is empty
                    if (board[i][j] == 'E')
                    {
                         
                        // Make the move
                        board[i][j] = opponent;
      
                        // Call minimax recursively and
                        // choose the minimum value
                        best = Math.min(best, minimax(board,
                                        depth + 1, !isMax));
      
                        // Undo the move
                        board[i][j] = 'E';
                    }
                }
            }
            return best;
        }
    }
     
    // This will return the best possible
    // move for the player
    function findBestMove(board)
    {
        let bestVal = -1000;
        let bestMove = new Move();
        bestMove.row = -1;
        bestMove.col = -1;
      
        // Traverse all cells, evaluate
        // minimax function for all empty
        // cells. And return the cell
        // with optimal value.
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                 
                // Check if cell is empty
                if (board[i][j] == 'E')
                {
                     
                    // Make the move
                    board[i][j] = player;
      
                    // compute evaluation function
                    // for this move.
                    let moveVal = minimax(board, 0, false);
      
                    // Undo the move
                    board[i][j] = 'E';
      
                    // If the value of the current move
                    // is more than the best value, then
                    // update best
                    if (moveVal > bestVal)
                    {
                        bestMove.row = i;
                        bestMove.col = j;
                        bestVal = moveVal;
                    }
                }
            }
        }
      
        return bestMove;
    }

    playBestMove = () => {
        if(jim.isTurn){
            player="O"
            opponent="X"
        }
        else{
            player="X"
            opponent="O"
        }    
        let board = controller.createGameBoardState()
        const moveToPlay = findBestMove(board)
        console.log("board", board, "move to play", moveToPlay)
        if(gameboard.aiTurn === true && gameboard.winner.length < 1 ){
            let square = document.querySelector(`[row="${moveToPlay.row}"][col="${moveToPlay.col}"]`)
            console.log(square, "AI PLAYED")
            square.click()
            gameboard.aiTurn = false
        }
    }

    return {random, findBestMove, playBestMove}
})();



const start = document.querySelector(".startButton")
start.addEventListener("click", ()=>{
    gameboard.p1Mode = document.querySelector('input[name="mode1"]:checked').value;
    gameboard.p2Mode = document.querySelector('input[name="mode2"]:checked').value;
    console.log("restart", gameboard.p1Mode, gameboard.p2Mode)
    controller.startGame()
})

const bestMove = document.querySelector(".bestMove")
bestMove.addEventListener("click", ()=>{
    const moveCheated = ai.findBestMove(controller.createGameBoardState())
    const cheatDisplay = document.querySelector(".cheatDisplay")
    cheatDisplay.textContent = `Play row ${moveCheated.row+1} column ${moveCheated.col+1}`
    console.log(moveCheated)
})

console.log(gameboard.state)