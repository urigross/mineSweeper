'use strict';

// open the modal 
function openModal() {
    var eModal = document.querySelector('.modal');
    eModal.style.display = "block";
};

function closeModal() {
    var eModal = document.querySelector('.modal');
    eModal.style.display = "none";
};

function printWinModal(isVictoy) {
    openModal();
    var ele = document.querySelector('.modal-header h1');
    ele.innerText = isVictoy ? `you are a winner! You should be working on mine fields!` :
        `Ohh.. you lost!\nAt least you didn't die from a real Miner`;
};