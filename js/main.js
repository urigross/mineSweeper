'use strict';

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

function init() {
    gBoard = buildBoard(gLevel.SIZE);
    console.log(gBoard);
    gBoard[0][0].isMine = true;
    gBoard[1][1].isMine = true;
    gBoard[3][3].isMine = true;
    renderBoard(gBoard);
};


function checkGameOver() {
    //Game ends when all mines are marked, and all the other cells are shown
};

function cellClicked(elCell, i, j) {
    gBoard[i][j].isShown = true;
    elCell.style.backgroundColor = "white";
    if (gBoard[i][j].isMine) elCell.innerText = MINE; // if it's a mine - render it
    else {
        elCell.innerText = (gBoard[i][j].minesAroundCount);
    }
    //Called when a cell (td) is clicked
};

function cellMarked(elCell) {
    //Called on right click to mark a cell (suspected to be a mine) 
    //Search the web (and implement) how to hide the context menu on right click
};