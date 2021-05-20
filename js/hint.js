'use strict';
var gHintsLeft = 3;


function bulbOn(bulbNum) {
    gGame.isHintOn = true;
    var ele = document.querySelector(`.bulb-${bulbNum}`);
    ele.src = "/img/bulb-light.jpg";
    ele.className = `.bulb-${bulbNum}-on`;
    gHintsLeft--;

}