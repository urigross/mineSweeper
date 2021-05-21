'use strict';

// Bulb/hint logic
function bulbOn(ele) {
    if (!gGame.shownCount && !gGame.markedCount) {
        alert('Make your move in the board first.');
        return;
    }
    if (ele.className === 'bulb') {
        ele.src = "img/bulb-light.jpg";
        ele.className += `-on`;
        gGame.isHintOn = true;
    }
}
// Reset all bulbs
function initBulbs() {
    var ele = document.querySelector(`.bulb`);
    ele.src = 'img/bulb.jpg';
    gGame.isHintOn = false;
}