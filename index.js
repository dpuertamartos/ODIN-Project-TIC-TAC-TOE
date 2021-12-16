const gameboard = {
    state: [["E", "E", "E"],["E", "E", "E"],["E", "E", "E"]],
}

const controller = (()=>{

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
    
    const gameChecker = () => {
        squares = document.querySelectorAll(".square")
        let array = []
        squares.forEach(square => array = array.concat(square.textContent))
        console.log(array)
        // first check horizontals and verticals
        for(let i=0; i<array.length;i=i+3){
            let row = array.slice(i,i+3)
            let column = [array[i],array[i+3],array[i+6]]
            if(row.every(e=>e==="X") || column.every(e=>e==="X")){
                return console.log("tim wins")
            }
            else if(row.every(e=>e==="O") || column.every(e=>e==="O")){
                return console.log("jim wins")
            }
        }
        // then check diagonals
        let diag1 = [array[0],array[4],array[8]]
        let diag2 = [array[2],array[4],array[6]]
        console.log("diag1", diag1, "diag2", diag2)
        if(diag1.every(e=>e==="X") || diag2.every(e=>e==="X")){
            return console.log("tim wins")
        }
        else if(diag1.every(e=>e==="O") || diag2.every(e=>e==="O")){
            console.log("jim wins")
            return console.log("jim wins")
        }
    }
    
    // Create Board
    const createBoard = () => {
        gameDiv = document.querySelector(".boardContainer")
        gameboard.state.map(row=>{
        const rowIndex = gameboard.state.indexOf(row)
        const newRowDiv = createNewRow(row, rowIndex)
        gameDiv.append(newRowDiv)
        })
        squares = document.querySelectorAll(".square")
        squares.forEach(square=>square.addEventListener("click", ()=>{
            if(jim.isTurn){
                jim.createMark(square)
                jim.isTurn = !jim.isTurn
                tim.isTurn = !tim.isTurn
                gameChecker()
            }
            else{
                tim.createMark(square)
                jim.isTurn = !jim.isTurn
                tim.isTurn = !tim.isTurn
                gameChecker()
            }
            console.log(square)
        }))
    }
    return {
        createBoard
    }

})();

const Player = (name, id1) => {
    let isTurn = false
    let id = id1
    const changeTurn = () => isTurn = !isTurn
    const createMark = (span) =>{
        console.log(span.textContent, "id", id)
        if(span.textContent!="E"){return ;}
        else if(id===1){span.textContent="O"}
        else{span.textContent="X"}
    }
    return {isTurn, changeTurn, createMark}
}


controller.createBoard()
const jim = Player("jim", 1)
const tim = Player("tim", 2)
jim.isTurn=true
console.log(gameboard.state)