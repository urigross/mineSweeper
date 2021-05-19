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
    placeNewMine(gBoard);
    placeNewMine(gBoard);
    placeNewMine(gBoard);
    renderBoard(gBoard);
};


function checkGameOver() {
    //Game ends when all mines are marked, and all the other cells are shown
};

function cellClicked(elCell, i, j) {
    if (gBoard[i][j].isMarked) return;
    if (!gstartTimeStamp) {
        gstartTimeStamp = getTimeStamp();
        stopwatch();
    };
    gBoard[i][j].isShown = true;
    elCell.style.backgroundColor = "white";
    if (gBoard[i][j].isMine) elCell.innerText = MINE; // if it's a mine - render it
    else {
        elCell.innerText = (gBoard[i][j].minesAroundCount);
    }
    //Called when a cell (td) is clicked
};