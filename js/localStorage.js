'use strict';

// Local storage functions
function setBestScoreLocSt() {
    //if no bestTime on localstorage or best time is better than local storage best time
    if (localStorage.getItem('bestTime') === null || localStorage.getItem(`bestTime`) * 100000 > gGame.time) {
        localStorage.setItem(`bestTime`, gGame.time); //save "best time" on local storage
    }
}