const gameboard = {
    state: [["E", "E", "E"],["E", "E", "E"],["E", "E", "E"]],
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
    
    const gameChecker = (p1,p2) => {
        squares = document.querySelectorAll(".square")
        let array = []
        squares.forEach(square => array = array.concat(square.textContent))
        console.log(array)
        // first check horizontals and verticals
        for(let i=0; i<array.length;i=i+3){
            let row = array.slice(i,i+3)
            let column = [array[i],array[i+3],array[i+6]]
            if(row.every(e=>e==="X") || column.every(e=>e==="X")){
                displayContainer.textContent = `${p2.sayName()} wins!`
                return console.log(`${p2.sayName()} wins!`)
            }
            else if(row.every(e=>e==="O") || column.every(e=>e==="O")){
                displayContainer.textContent = `${p1.sayName()} wins!`
                return console.log(`${p1.sayName()} wins!`)
            }
        }
        // then check diagonals
        let diag1 = [array[0],array[4],array[8]]
        let diag2 = [array[2],array[4],array[6]]
        console.log("diag1", diag1, "diag2", diag2)
        if(diag1.every(e=>e==="X") || diag2.every(e=>e==="X")){
            displayContainer.textContent = `${p2.sayName()} wins!`
            return console.log(`${p2.sayName()} wins!`)
        }
        else if(diag1.every(e=>e==="O") || diag2.every(e=>e==="O")){
            displayContainer.textContent = `${p1.sayName()} wins!`
            return console.log(`${p1.sayName()} wins!`)
        }
        // check diagonals for draw
        if(array.includes("E")===false){
            displayContainer.textContent = "draw!"
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
        const jim = Player(p1.value, 1)
        const tim = Player(p2.value, 2)
        jim.isTurn=true
        console.log(jim)
        console.log(tim)
        controller.createBoard(jim, tim)
    }

    
    return {
        createBoard, startGame
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




const start = document.querySelector(".startButton")
start.addEventListener("click", ()=>{
    controller.startGame()
})

console.log(gameboard.state)