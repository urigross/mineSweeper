'use strict';
var gstartTimeStamp = null;
var stopwatchInterval;

function getTimeStamp() {
    var d = new Date();
    var n = d.getTime();
    return parseInt(n) / 1000;
};

function getGameDuration() {
    var endGameTimeStamp = getTimeStamp(); //Get CurrentTime
    gGame.time = endGameTimeStamp - gstartTimeStamp
    return gGame.time;
};

function stopwatch() {
    renderStopWatch(getGameDuration());
    stopwatchInterval = setTimeout(stopwatch, 1000);
};

function getClockFromSeconds(sec) {
    var sec_num = parseInt(sec, 10);
    var mil_sec = Math.floor(sec_num * 3600);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
}

function renderClearTime() {
    document.querySelector('.stopwatch').innerText = '';
}