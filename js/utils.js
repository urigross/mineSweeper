'use strict';

function getAvailablePos(board) {
    var posFound = false;
    while (i === gUserIpos && j === gUserJpos || currentBoardPos.isMine) {
        var currentAvailablePos = { i, j }; // Create new obj every time
        var i = getRandomIntInclusive(0, board.length - 1);
        var j = getRandomIntInclusive(0, board[0].length - 1);
        var currentBoardPos = board[i][j];
        if (!currentBoardPos.isMine && !(i == gUserIpos && j == gUserJpos)) {
            currentAvailablePos.i = i;
            currentAvailablePos.j = j;
            return currentAvailablePos;
        }
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}