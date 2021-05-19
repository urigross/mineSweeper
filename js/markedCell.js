'use strict';

const MARKED = '🚩';

function cellMarked(ele, i, j) {
    if (!gstartTimeStamp) {
        gstartTimeStamp = getTimeStamp();
        stopwatch();
    };
    if (gBoard[i][j].isShown) return; // if cell is shown you can't mark it.
    if (gBoard[i][j].isMarked) {
        console.log('flagged');
        // if cell is flagged
        gBoard[i][j].isMarked = false;
        ele.innerText = '';
    }
    // if cell is not flagged
    else {
        console.log('unflagged');
        gBoard[i][j].isMarked = true;
        ele.innerText = MARKED;
    }
    return false; // preventing from menu to popup
}