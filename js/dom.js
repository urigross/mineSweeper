'use strict';

function expandShown(board, elCell, i, j) {
    //When user clicks a cell with no mines around, we need to open not only that cell, 
    //but also its neighbors. 
    //NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors 
    //BONUS: if you have the time later, try to work more like the real algorithm 
    //(see description at the Bonuses section below)
};

function renderBoard(board, className) {
    var strHTML = '<table border="1"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cellSign = '';
            board[i][j];
            //else cellSign = '';; //var className = 'cell cell' + i + '-' + j;
            // strHTML += '<td class="' + className + '"> ' + cell + ' </td>';
            //if (board[i][j].isShown) { // If position is reveled
            var negsCount;
            negsCount = getMinesNegsCount(board, i, j); // check neighbours mines
            if (negsCount) { // If there are neigbhours
                board[i][j].minesAroundCount = negsCount; // assign to minesArounCount Key   at model

            }
            if (board[i][j].isShown) {
                if (board[i][j].isMine) {
                    cellSign = MINE;
                } else {
                    cellSign = negsCount;
                }
            }
            strHTML += `<td data-i="${i}" data-j="${j}" class="${className}" onclick="cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this, ${i},${j}); return false;">${cellSign}</td>`;
            cellSign = '';

        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector('.board-container');
    elContainer.innerHTML = strHTML;
    //Render the board as a <table> to the page
};

function renderCell(i, j, value) {
    var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
    elCell.innerText = value;
};