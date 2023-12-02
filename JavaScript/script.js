'use strict';

const newGame = document.getElementById('newGame');
const loadGame = document.getElementById('loadGame');

newGame.addEventListener('click', function (evt) {
    window.location.href = 'difficulty.html';
});

loadGame.addEventListener('click', function (evt) {
    window.location.href = 'loadgame.html';
});
