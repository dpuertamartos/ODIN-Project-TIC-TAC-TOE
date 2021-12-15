const gameboard = {
    state: [["0", "0", "0"],["0", "0", "0"],["0", "0", "0"]]
}

const controller = {}

const player = (name) => {
    return ;
}

const createNewDiv = (textContent) => {
    const newDiv = document.createElement("div")
    newDiv.textContent = textContent
    return newDiv
}

const createNewSpan = (textContent) => {
    const newSpan = document.createElement("span")
    newSpan.textContent = textContent
    return newSpan
}

const createNewRow = (row) => {
    const newRowDiv = createNewDiv()
    for(let i=0; i<row.length; i++){
        const newSquareSpan = createNewSpan(row[i])
        newRowDiv.append(newSquareSpan)
    }
    return newRowDiv
}

// Create Board

gameDiv = document.querySelector(".boardContainer")
gameboard.state.map(row=>{
    const newRowDiv = createNewRow(row)
    gameDiv.append(newRowDiv)
})

console.log(gameboard.state)