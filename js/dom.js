'use strict';
var gBlinkFlag = true;

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
                    // if (!cellSign) cellSign = '';
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
    if (!value) value = '';
    elCell.style.trasition = "0.5s";
    elCell.innerText = value;
    elCell.style.backgroundColor = "white";
    elCell.style.color = "black"
};

function renderTempCell(i, j, value) {
    var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
    if (!value) value = '';
    elCell.style.trasition = "0.5s";
    elCell.innerText = value;
    elCell.style.backgroundColor = "white";
    elCell.style.color = "black"
    setTimeout(() => {
        elCell.style.trasition = "0.5s";
        elCell.innerText = '';
        elCell.style.backgroundColor = '';
        gGame.isHintOn = false;
    }, 1000, elCell);
};

function blinkMineCell(cellEle) {
    if (gBlinkFlag) {
        renderMood('dead');
        cellEle.innerText = MINE;
        gBlinkFlag = false;
    } else if (!false) {
        renderMood('normal');
        cellEle.innerText = '';
        gBlinkFlag = true;
    }
};
// Moods...
function renderMood(mood) {
    var str = '';
    var ele = document.querySelector('.mood');
    switch (mood) {
        case 'normal':
            str = '????';
            break;
        case 'dead':
            str = '????';
            break;
        case 'win':
            str = '????';
            break;
        default:
            console.log('Error in dom.js renderMood(): mood:', mood);
    }
    ele.innerText = str;
}

function blinkMood(sign) {
    var ele = document.querySelector('.mood');
    if (gBlinkFlag) {
        ele.innerText = sign;
        gBlinkFlag = false;
    } else if (!false) {
        ele.innerText = '';
        gBlinkFlag = true;
    };
};
// StopWatch
function renderStopWatch(clock) {
    document.querySelector('.stopwatch').innerHTML = getClockFromSeconds(clock);
};
//Prints to screen bestTimeduration with only 2 places after dots rounding
function renderBesTime(isNewBestTime) {
    var bestTimeElement = document.querySelector('.best-time-result');
    bestTimeElement.innerText = getClockFromSeconds(Number(localStorage.getItem('bestTime')));
    (isNewBestTime) ? bestTimeElement.style.color = "red": bestTimeElement.style.color = "white";
};