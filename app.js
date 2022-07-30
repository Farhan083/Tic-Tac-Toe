// HTML elements (grabbing elements)
const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset");
const cellDivs = document.querySelectorAll(".game-cell");

//game constants
const xSymbol = '×';
const oSymbol = '○';

// game variables

let gameIsRunning = true; // if true game running if false game stoppeed
let xIsNext = true;   // true = x turn; if false then 0 turn
let winner = null;

//functions 
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameIsRunning = false;
    winner = letter;
    if(winner === 'x') {
        statusDiv.innerHTML = `${letterToSymbol(winner)} has won!`;
    }
    else {
        statusDiv.innerHTML = `<span>${letterToSymbol(winner)} has won!</span>`;
    }
}

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[2];
    const topMiddle = cellDivs[1].classList[2];
    const topRight = cellDivs[2].classList[2]; 
    const middleLeft = cellDivs[3].classList[2];
    const middleMiddle = cellDivs[4].classList[2];
    const middleRight = cellDivs[5].classList[2];
    const bottomLeft = cellDivs[6].classList[2];
    const bottomMiddle = cellDivs[7].classList[2];
    const bottomRight = cellDivs[8].classList[2];

    // check winner
    if(topLeft && topLeft === topMiddle && topLeft === topRight) {
        handleWin(topLeft);
    }
    else if(middleLeft && middleLeft === middleMiddle && middleLeft === middleRight){
        handleWin(middleLeft);
    }
    else if(bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight){
        handleWin(bottomLeft);
    }
    else if(topLeft && topLeft === middleLeft && topLeft === bottomLeft){
        handleWin(topLeft);
    }
    else if(topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle){
        handleWin(topMiddle);
    }
    else if(topRight && topRight === middleRight && topRight === bottomRight){
        handleWin(topRight);
    }
    else if(topLeft && topLeft === middleMiddle && topLeft === bottomRight){
        handleWin(topLeft);
    }
    else if(topRight && topRight === middleMiddle && topRight === bottomLeft){
        handleWin(topRight);
    }
    else if (topLeft && topMiddle && topRight && middleRight && middleMiddle
        && middleLeft && bottomLeft && bottomMiddle && bottomRight ) 
        {
        gameIsRunning = false;
        statusDiv.innerHTML = 'GAME IS TIED';
    }
    else {
        
    }
}

// event handlers 
const handleReset = (e) => {
    console.log(e);   // e is variable for event

    // setting all the conditions to default
    statusDiv.innerHTML = `${xSymbol} is next`;
    xIsNext = true;
    for(const cellDiv of cellDivs){
        if(cellDiv.classList.contains('x')){
            cellDiv.classList.remove('x')
        }

        else if(cellDiv.classList.contains('o')){
            cellDiv.classList.remove('o')
        }
    }
}

const clickCellDiv = (e) => {
    const classList = e.target.classList;
    const location = classList[1];   // storing 2nd class in location

    if(classList[2]==='x' || classList[2]==='o' || !gameIsRunning) {  
        return;   // if 3rd class contains either x or o then return and not add further any class
    }

    if(xIsNext) {    // equivalent to xIsNext ==== true
        classList.add('x');
        // To change the status bar
        statusDiv.innerHTML = `${oSymbol} is next`;
        checkGameStatus();
        xIsNext = !xIsNext;   //changing the boolean

        
    }

    else {
        classList.add('o');
        // to change the status bar
        statusDiv.innerHTML = `${xSymbol} is next`;
        checkGameStatus();
        xIsNext = !xIsNext;
        
    }
}

//event listeners

resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs){    // this will iterate through each of the 
    cellDiv.addEventListener('click', clickCellDiv);       // cellDivs items and store in cellDiv
}
/*
The for...of statement creates a loop iterating over iterable objects,
including: built-in String, Array, array-like objects
(e.g., arguments or NodeList), TypedArray, Map, Set, and user-defined iterables.
*/

