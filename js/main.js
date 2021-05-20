'use strict';

var gGame;
var gUserIpos;
var gUserJpos;

function init() {
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        live: 3,
        isHintOn: false
    };
    closeModal();
    renderClearTime();
    printLivesToScreen(gGame.live);
    gGame.isOn = true;
    gBoard = buildBoard(gLevel.SIZE);
    console.log(gBoard);
    renderBoard(gBoard, false);
};


// function checkGameOver() {
//     //Game ends when all mines are marked, and all the other cells are shown
// };

function cellClicked(elCell, i, j) {
    // If it's first move
    if (!gGame.shownCount) {
        gstartTimeStamp = getTimeStamp();
        stopwatch();
        placeMiners(gBoard);
        renderBoard(gBoard, true);
        renderMood('normal');
    }
    if (gBoard[i][j].isMarked || !gGame.isOn || gBoard[i][j].isShown) return; // if cell is marked or shown or game over  -  the mouse will not respone
    // Mine & not first move
    if (gBoard[i][j].isMine && gGame.shownCount && !gGame.isHintOn) {
        // Lives....
        if (gGame.live > 0) {
            var blinkInverval = setInterval(() => {
                blinkMineCell(elCell);
            }, 100, elCell);
            setTimeout(function() {
                clearInterval(blinkInverval);
                elCell.innerText = '';
            }, 3000);
            gGame.live--;
            printLivesToScreen(gGame.live);
            return;
        } else {
            elCell.innerText = MINE; // if it's a mine - render it

            endGame(false);
            return;
        }
    }
    if (gGame.isHintOn) {
        reavelTempStNegs(gBoard, i, j);
        return;
    }
    revealCell(gBoard, i, j);
    reavel1StNegs(gBoard, i, j); //reaveal neighbours
    gBoard[i][j].isShown = true;
    elCell.style.backgroundColor = "white";
    elCell.innerText = (gBoard[i][j].minesAroundCount);
    if (isWin()) { // Check for win
        endGame(true);
    };
};

function endGame(isVictory) {
    gGame.isOn = false;
    clearInterval(stopwatchInterval);
    (isVictory) ? renderMood('win'): renderMood('dead');
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
    //var className = `${lvl}-tbl`;
    init();
}

function revealCell(board, i, j) {
    RevealedCellToModel(board, i, j); // model
    renderCell(i, j, gBoard[i][j].minesAroundCount);
};

function reavel1StNegs(board, cellI, cellJ) {
    //Count mines around each cell 
    //and set the cell's minesAroundCount.
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue; // if it's out of i mat cells don't count
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue; // if it's out of j mat cells don't count
            if (board[i][j].isMarked || board[i][j].isMine || board[i][j].isShown || (i === cellI && j === cellJ)) continue;
            revealCell(board, i, j);
        };
    };
};

function reavelTempStNegs(board, cellI, cellJ) {
    //Count mines around each cell 
    //and set the cell's minesAroundCount.
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue; // if it's out of i mat cells don't count
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue; // if it's out of j mat cells don't count
            if (board[i][j].isMarked || board[i][j].isMine || board[i][j].isShown) continue;
            renderTempCell(i, j, gBoard[i][j].minesAroundCount);

        };
    };
};