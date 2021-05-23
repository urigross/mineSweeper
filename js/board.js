'use strict';

var gBoard;
var gLevel = {
    SIZE: 4,
    MINES: 2
};
// Build a table with non-mine cells to model
function buildBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            board[i][j] = getNewCell(false);
        }
    };
    return board;
}

function getNewCell(isMine = false) {
    var newCell = {
        minesAroundCount: 0,
        isShown: false,
        isMine,
        isMarked: false
    };
    return newCell;
}

function getMinesNegsCount(board, cellI, cellJ) {
    //Count mines around each cell 
    //and set the cell's minesAroundCount.
    var negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue; // if it's out of i mat cells don't count
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue; // if this is the main cell don't count
            if (j < 0 || j >= board[i].length) continue; // if it's out of j mat cells don't count
            if (board[i][j].isMine === true) negsCount++;
        }
    }
    return negsCount;
};

function RevealedCellToModel(board, i, j) {
    board[i][j].isShown = true;
    gGame.shownCount++;
};