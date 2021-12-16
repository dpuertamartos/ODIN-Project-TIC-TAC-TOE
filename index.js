const gameboard = {
    state: [["E", "E", "E"],["E", "E", "E"],["E", "E", "E"]]
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
    
    const createMark = (span) =>{
        if(span.textContent==="X"){return ;}
        else{span.textContent ="X"}
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
            createMark(square)
            console.log(square)
        }))
    }
    return {
        createBoard
    }

})();

const player = (name, id) => {
    let isTurn = false
    let id = id
    const changeTurn = () => isTurn = !isTurn
    const createMark = (span) =>{
        if(span.textContent!="E"){return ;}
        else if(id===1){span.textContent==="O"}
        else{span.textContent==="X"}
    }
    return {changeTurn, createMark}
}


controller.createBoard()
console.log(gameboard.state)