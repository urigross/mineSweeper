'use strict';

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

function init() {
    gGame.isOn = true;
    gBoard = buildBoard(gLevel.SIZE);
    console.log(gBoard);
    placeMiners(gBoard);
    renderBoard(gBoard);
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
    //console.log(`iswin`, isWin());
    if (isWin()) { // Check for win
        endGame(true);
    };
};

function endGame(isVictory) {
    gGame.isOn = false;
    clearInterval(stopwatchInterval);
    if (isVictory) {
        alert(`you are a winner! You should be working on mine fields!`);
    } else {
        alert("Hey .. At least you didn't die from a real Miner\nTry Again !");
    };
}



// Win functions

function isWin() {
    return gLevel.SIZE * gLevel.SIZE === gGame.shownCount + gGame.markedCount;
}

// function areAllMinesFlagged(board) {
//     var markedMinersCount = 0;
//     for (var i = 0; i < board.length; i++) {
//         var currentRow = board[i];
//         for (var j = 0; j < currentRow.length; j++) {
//             if (currentRow[j].isMine && currentRow[j].isMarked)
//                 markedMinersCount++;
//         }

//     }
//     return gGame.markedCount === markedMinersCount;
// }

// function isWin() {
//     if (areAllMinesFlagged(gBoard)) {
//         var boardTotalCells = gLevel.SIZE * gLevel.SIZE;
//         return boardTotalCells === gGame.markedCount + gGame.shownCount;
//     } else return false;
// };