'use strict';
var gBlinkFlag = true;

function expandShown(board, elCell, i, j) {
    //When user clicks a cell with no mines around, we need to open not only that cell, 
    //but also its neighbors. 
    //NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors 
    //BONUS: if you have the time later, try to work more like the real algorithm 
    //(see description at the Bonuses section below)
};

function renderBoard(board, isFullTable) {

    var strHTML = `<table border="1"><tbody>`;
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cellSign = '';
            board[i][j];
            var negsCount;
            negsCount = getMinesNegsCount(board, i, j); // count neighbours mines
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
            if (!isFullTable) cellSign = '';
            strHTML += `<td data-i="${i}" data-j="${j}" onclick="cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this, ${i},${j}); return false;">${cellSign}</td>`;
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
    elCell.style.backgroundColor = 'white';
};

// function blinkMine(i, j, elCell) {

//     setInterval(() => {
//         renderCell(i, j, MINE);
//         setTimeout(elCell.innerText = '', 1000);

//     }, 1000);
// }

function blinkMineCell(cellEle) {
    if (gBlinkFlag) {
        cellEle.innerText = MINE;
        gBlinkFlag = false;
    }
    // document.getElementById("yourId").style.background="yourColor 1";
    else if (!false) {
        cellEle.innerText = '';
        gBlinkFlag = true;
    }
}