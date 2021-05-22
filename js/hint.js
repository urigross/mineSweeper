'use strict';

// Bulb/hint logic
function bulbOn(ele) {
    if (!gGame.shownCount && !gGame.markedCount) {
        alert('Make your move in the board first.');
        return;
    }
    if (ele.className !== 'bulb-on') {
        ele.src = "img/bulb-light.jpg";
        ele.classList.toggle("bulb-on");
        gGame.isHintOn = true;
    }
}
// Reset all bulbs
function initBulbs() {
    const img = document.querySelectorAll('.hints img');
    //img.classList.remove;
    console.log(img[0]);
    for (var i = 0; i < img.length; i++) {
        img[i].classList.remove('bulb-on');
        img[i].src = "img/bulb.jpg";


    }
}