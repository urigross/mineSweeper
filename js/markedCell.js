'use strict';

const MARKED = '🚩';

function cellMarked(ele, i, j) {
    if (!gstartTimeStamp) {
        gstartTimeStamp = getTimeStamp();
        stopwatch();
    };
    if (gBoard[i][j].isShown || !gGame.isOn) return; // if cell is shown you can't mark it. / game over - Mouse will deactivated
    if (gBoard[i][j].isMarked) {
        // if cell is flagged
        gBoard[i][j].isMarked = false;
        ele.innerText = '';
        gGame.markedCount--;
    }
    // if cell is not flagged
    else {
        gBoard[i][j].isMarked = true;
        ele.innerText = MARKED;
        gGame.markedCount++;
        if (isWin()) { // Check for win
            checkGameOver(true);
        };
    }
    return false; // preventing from menu to popup
}