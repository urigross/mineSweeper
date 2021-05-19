'use strict';

function getAvailablePos(board) {
    var posFound = false;
    while (!posFound) {
        var currentAvailablePos = { i, j }; // Create new obj every time
        var i = getRandomIntInclusive(1, board.length - 2);
        var j = getRandomIntInclusive(1, board[0].length - 2);
        var currentBoardPos = board[i][j];
        console.log(currentBoardPos);
        if (currentBoardPos === FOOD) {
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