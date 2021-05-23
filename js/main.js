// TODO: erase 0 from dom
// Bonus Tasks
'use strict';

var gGame;
var gUserIpos;
var gUserJpos;
//Game Sounds
const GAME_MUSIC = new Audio('sounds/solve_the_puzzle.ogg');
const CLICK_SND = new Audio('sounds/click.wav');
const EXPLOSION_SND = new Audio('sounds/explosion_sound.wav');
const GAME_OVER_SND = new Audio('sounds/game_over.wav');
const SMALL_WIN_SND = new Audio('sounds/small_win.wav');
const BIG_WIN_SND = new Audio('sounds/big_win.wav');
var volLvl = 0.2;


function init() {
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        live: 3,
        isHintOn: false,
        time: null,
    };
    renderClearTime();
    renderBesTime();
    initBulbs();
    printLivesToScreen(gGame.live);
    gGame.isOn = true;
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard, false); //  True/False para. means with or without cell content
    renderMood('normal');
};

function endGame() {
    closeModal();
    init();
}

function cellClicked(elCell, i, j) {
    if (gBoard[i][j].isMarked || !gGame.isOn || gBoard[i][j].isShown) return; // if cell is marked or shown or game over  -  the mouse will not respone
    // If it's first move
    if (!gGame.shownCount) {
        gstartTimeStamp = getTimeStamp(); // start stopwatch
        stopwatch(); // stopwatch to DOM
        placeMiners(gBoard);
        renderBoard(gBoard, true);
        GAME_MUSIC.volume = volLvl;
        GAME_MUSIC.play();
    }
    // Mine
    if (gBoard[i][j].isMine && gGame.shownCount && !gGame.isHintOn) {
        // Mine and have more Lives
        if (gGame.live > 0) {
            EXPLOSION_SND.play();
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
            // mine with no lives
        } else {
            EXPLOSION_SND.volume = volLvl;
            EXPLOSION_SND.play();
            elCell.style.trasition = "0.5s";
            elCell.innerText = MINE; // if it's a mine - render it
            checkGameOver(false);
            return;
        }
    }
    // If hint is on..
    if (gGame.isHintOn) {
        reavelTempStNegs(gBoard, i, j);
        return;
    }
    revealCell(gBoard, i, j);
    reavel1StNegs(gBoard, i, j); //reaveal neighbours
    if (isWin()) { // Check for win
        checkGameOver(true);
    };
};

function checkGameOver(isVictory) {
    gGame.isOn = false;
    clearInterval(stopwatchInterval);
    if (isVictory) {
        if (gLevel.SIZE === 12) {
            BIG_WIN_SND.volume = volLvl;
            BIG_WIN_SND.play();
        };
        SMALL_WIN_SND.volume = volLvl;
        SMALL_WIN_SND.play();
        renderMood('win');
        setBestScoreLocSt();
    } else renderMood('dead');
    GAME_MUSIC.pause();
    GAME_OVER_SND.volume = volLvl;
    GAME_OVER_SND.play();
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
    // Reset Game procedure
    gGame.isOn = false;
    clearInterval(stopwatchInterval);
    endGame();
}

function revealCell(board, i, j) {
    RevealedCellToModel(board, i, j); // model
    renderCell(i, j, gBoard[i][j].minesAroundCount);
    CLICK_SND.volume = volLvl;
    CLICK_SND.play();
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