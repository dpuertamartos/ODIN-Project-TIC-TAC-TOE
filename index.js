const gameboard = {
    state: [["E", "E", "E"],["E", "E", "E"],["E", "E", "E"]],
    mode: "pvp",
    aiTurn: true,
    winner: "",
    aiInvencible: true,
}

const controller = (()=>{
    const displayContainer = document.querySelector(".displayContainer")

    const createNewDiv = (rowIndex) => {
        const newDiv = document.createElement("div")
        newDiv.setAttribute("index", rowIndex)
        return newDiv
    }
    
    const createNewSpan = (textContent) => {
        const newSpan = document.createElement("span")
        newSpan.textContent = textContent
        return newSpan
    }
    
    const createNewRow = (row, rowIndex) => {
        const newRowDiv = createNewDiv(rowIndex)
        for(let i=0; i<row.length; i++){
            const newSquareSpan = createNewSpan(row[i])
            newSquareSpan.setAttribute("row", rowIndex)
            newSquareSpan.setAttribute("column", i)
            newSquareSpan.className="square"
            newRowDiv.append(newSquareSpan)
        }
        return newRowDiv
    }
    
    const createGameBoardState = () => {
        squares = document.querySelectorAll(".square")
        let array = []
        let newState = []
        squares.forEach(square => array = array.concat(square.textContent))
        for(let i=0; i<array.length;i=i+3){
            let row = array.slice(i,i+3)
            newState.push(row)
        }
        gameboard.state= newState
        console.log(gameboard.state)
        return gameboard.state
    }

    const gameChecker = (p1,p2) => {
        squares = document.querySelectorAll(".square")
        let array = []
        squares.forEach(square => array = array.concat(square.textContent))
        console.log(array)
        // first check horizontals and verticals
        for(let i=0; i<array.length;i=i+3){
            let row = array.slice(i,i+3)
            if(row.every(e=>e==="X")){
                displayContainer.textContent = `${p2.sayName()} wins!`
                gameboard.winner = displayContainer.textContent
                return console.log(`${p2.sayName()} wins!`)
            }
            else if(row.every(e=>e==="O")){
                displayContainer.textContent = `${p1.sayName()} wins!`
                gameboard.winner = displayContainer.textContent
                return console.log(`${p1.sayName()} wins!`)
            }
        }
        // then check verticals 
        for(let i=0; i<3;i++){
            let column = [array[i],array[i+3],array[i+6]]
            if(column.every(e=>e==="X")){
                displayContainer.textContent = `${p2.sayName()} wins!`
                gameboard.winner = displayContainer.textContent
                return console.log(`${p2.sayName()} wins!`)
            }
            else if(column.every(e=>e==="O")){
                displayContainer.textContent = `${p1.sayName()} wins!`
                gameboard.winner = displayContainer.textContent
                return console.log(`${p1.sayName()} wins!`)
            }
        }

        // then check diagonals
        let diag1 = [array[0],array[4],array[8]]
        let diag2 = [array[2],array[4],array[6]]
        console.log("diag1", diag1, "diag2", diag2)
        if(diag1.every(e=>e==="X") || diag2.every(e=>e==="X")){
            displayContainer.textContent = `${p2.sayName()} wins!`
            gameboard.winner = displayContainer.textContent
            return console.log(`${p2.sayName()} wins!`)
        }
        else if(diag1.every(e=>e==="O") || diag2.every(e=>e==="O")){
            displayContainer.textContent = `${p1.sayName()} wins!`
            gameboard.winner = displayContainer.textContent
            return console.log(`${p1.sayName()} wins!`)
        }
        // check diagonals for draw
        if(array.includes("E")===false){
            displayContainer.textContent = "draw!"
            gameboard.winner = displayContainer.textContent
            return console.log("draw")
        }
    }
    
    const destroyGrid = () => {
        const container = document.querySelector(".boardContainer")
        const body = document.querySelector("body")
        body.removeChild(container)
        const newContainer = document.createElement("div")
        newContainer.className = "boardContainer"
        const cContainer = document.querySelector(".controllersContainer")
        body.insertBefore(newContainer, cContainer)
    }

    // Passes turn if mark is created
    const passTurn = (isMarkCreated, jim, tim) => {
        if(isMarkCreated){
            jim.isTurn = !jim.isTurn
            tim.isTurn = !tim.isTurn
            gameChecker(jim,tim)
            if(gameboard.mode==="god"){
                gameboard.aiTurn = !gameboard.aiTurn
                ai.playBestMove()
            }
            if(gameboard.mode==="dumb"){
                gameboard.aiTurn = !gameboard.aiTurn
                ai.random()
            }
        }
    }

    // Create Board
    const createBoard = (jim, tim) => {
        //Need to add to destroy board first
        destroyGrid()
        gameDiv = document.querySelector(".boardContainer")
        gameDivNew = document.createElement("div")
        gameDiv.par
        gameboard.state.map(row=>{
        const rowIndex = gameboard.state.indexOf(row)
        const newRowDiv = createNewRow(row, rowIndex)
        gameDiv.append(newRowDiv)
        })
        squares = document.querySelectorAll(".square")
        squares.forEach(square=>square.addEventListener("click", ()=>{
            if(gameboard.aiTurn === true){console.log("ai play")}
            if(jim.isTurn){
                const markCreated = jim.createMark(square)
                passTurn(markCreated, jim, tim)
            }
            else{
                const markCreated = tim.createMark(square)
                passTurn(markCreated, jim, tim)
            }
            console.log(square)
        }))
    }

    const startGame = () => {
        const p1= document.querySelector("#name1")
        const p2 = document.querySelector("#name2")
        console.log(p1.value, p2.value)
        if (gameboard.mode != "pvp"){
            p1.value = "AI"
        }
        const jim = Player(p1.value, 1)
        const tim = Player(p2.value, 2)
        jim.isTurn=true
        console.log(jim)
        console.log(tim)
        controller.createBoard(jim, tim)
    }

    
    return {
        createBoard, startGame, createGameBoardState
    }

})();

const Player = (name, id1) => {
    let isTurn = false
    let id = id1
    const sayName = () => name
    const changeTurn = () => isTurn = !isTurn
    const createMark = (span) =>{
        console.log(span.textContent, "id", id)
        if(span.textContent!="E"){
            return false
        }
        else if(id===1){
            span.textContent="O" 
            return true
        }
        else{
            span.textContent="X"
            return true
        }
    }
    return {isTurn, changeTurn, createMark, sayName}
}

// ai select random empty square and clicks


const ai = (() => {
    const random = () => {
        if(gameboard.aiTurn === true && gameboard.winner.length < 1 ){
            let squares = document.querySelectorAll(".square")
            squares = Array.from(squares)
            squares = squares.filter(square => square.textContent === "E")
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
        let board = controller.createGameBoardState()
        console.log(board)
        const moveToPlay = findBestMove(board)
        console.log(moveToPlay)
        if(gameboard.aiTurn === true && gameboard.winner.length < 1 ){
            console.log(moveToPlay, moveToPlay.row, moveToPlay.col, typeof moveToPlay.col)
            let square = document.querySelector(`[row="${moveToPlay.row}"][column="${moveToPlay.col}"]`)
            console.log(square, "AI PLAY")
            square.click("AI")
            gameboard.aiTurn = false
        }
    }

    return {random, findBestMove, playBestMove}
})();



const start = document.querySelector(".startButton")
start.addEventListener("click", ()=>{
    gameboard.mode = document.querySelector('input[name="mode"]:checked').value;
    if(gameboard.mode === "pvp"){
        controller.startGame()
    }
    else if (gameboard.mode === "god"){
        controller.startGame()
        ai.playBestMove()
    }
    else{
        controller.startGame()
        ai.random()
    }
})

const boardState = document.querySelector(".boardState")
boardState.addEventListener("click", ()=>{
    controller.createGameBoardState()
})

const bestMove = document.querySelector(".bestMove")
bestMove.addEventListener("click", ()=>{
    console.log(ai.findBestMove(controller.createGameBoardState()))
})

console.log(gameboard.state)