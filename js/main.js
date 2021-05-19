'use strict';

var gGame;

function init(className) {
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    };
    closeModal();
    gGame.isOn = true;
    gBoard = buildBoard(gLevel.SIZE);
    console.log(gBoard);
    placeMiners(gBoard);
    renderBoard(gBoard, className);
};


function checkGameOver() {
    //Game ends when all mines are marked, and all the other cells are shown
};

function cellClicked(elCell, i, j) {
    if (gBoard[i][j].isMarked || !gGame.isOn) return; // if cell is marked -  the mouse will not respone
    if (gBoard[i][j].isMine) {
        elCell.innerText = MINE; // if it's a mine - render it
        endGame(false);
        return;
    }
    if (!gstartTimeStamp) {
        gstartTimeStamp = getTimeStamp();
        stopwatch();
    };
    gBoard[i][j].isShown = true;
    gGame.shownCount++;
    elCell.style.backgroundColor = "white";
    elCell.innerText = (gBoard[i][j].minesAroundCount);
    if (isWin()) { // Check for win
        endGame(true);
    };
};

function endGame(isVictory) {
    gGame.isOn = false;
    clearInterval(stopwatchInterval);
    printWinModal(isVictory);
}



function isWin() {
    return gLevel.SIZE * gLevel.SIZE === gGame.shownCount + gGame.markedCount;
}


// Set levels
function setGameLevel(ele) {
    var lvl = ele.className.substring(0, ele.className.length - 4);
    switch (lvl) {
        case 'beginner':
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            break;

        case 'medium':
            gLevel.SIZE = 8;
            gLevel.MINES = 12;
            break;
        case 'expert':
            gLevel.SIZE = 12;
            gLevel.MINES = 30;
            break;
        default:
            console.log(`Error in setLevel(). Value received`, ele.className);
    }
    var className = `.${lvl}-cell`;
    init(className);
}