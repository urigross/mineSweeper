'use strict';

// Local storage functions
function setBestScoreLocSt() {
    //if no bestTime on localstorage or best time is better than local storage best time
    if (localStorage.getItem('bestTime') === null || localStorage.getItem(`bestTime`) > gGame.time) {
        localStorage.setItem(`bestTime`, gGame.time); //save "best time" on local storage
        // var blinkInverval = setInterval(() => {
        //     blinkMineCell(elCell);
        // }, 100, elCell);
        // setTimeout(function() {
        //     clearInterval(blinkInverval);
        //     elCell.innerText = '';
        // }, 3000); //////// change and continue......
        renderBesTime();
    }
}