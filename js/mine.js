'use strict';
const MINE = '💣';

function placeNewMine(board) {
    var availablePos = getAvailablePos(board); // Get Rnd pos.
    addMineToModel(board, availablePos); // Model
    //  renderCell(availablePos.i, availablePos.j, MINE); // DOM
};

function addMineToModel(board, pos) {
    var i = pos.i;
    var j = pos.j;
    board[i][j].isMine = true;
}