'use strict';

function printLivesToScreen(life) {
    var str = '';
    for (var i = 0; i < life; i++) {
        str += '💪';
    }
    var ele = document.querySelector('.lives');
    ele.innerText = str;

}