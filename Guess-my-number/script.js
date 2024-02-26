'use strict';

// 1. roll a dice (1-20)
// 2. keep score (higherst)
// 3.
// 3. change background collor when wins

let score = 20;
let dice = 0;
let higherstScore = 0;
let gameEnd = false;
let guess = 0;
// # event listener when the page is loaded

// TO-DO

function keepScore() {
  score--;
  document.querySelector('.score').textContent = score;
}

function verifyWin(guess, dice) {
  if (guess === dice) {
    // Won the game .number
    document.querySelector('.message').textContent = 'You win!';

    // set background-collor to green when player win's the game.
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').textContent = dice;
    setHighestScore(score);
    document.querySelector('.highscore').textContent =
      localStorage.getItem('score');
    gameEnd = true;
  } else if (score === 0) {
    // you lost  because you ran out of chances.
    gameEnd = true;
    document.querySelector('.message').textContent = 'You lost! =)';
  } else {
    keepScore();
    showTip(guess);
  }
}

function setHighestScore(score) {
  if (localStorage.getItem('score') < score) {
    localStorage.setItem('score', score);
  }
}

function showTip(guess) {
  if (guess - 1 === dice || guess + 1 === dice) {
    document.querySelector('.message').textContent =
      'You too cloose... keep going =)';
  } else {
    document.querySelector('.message').textContent =
      'You not even cloose. try again!';
  }
}

function rollDice() {
  let min = 1;
  let max = 20;
  dice = Math.floor(Math.random() * (max - min) + min);
  return dice;
}

function resetGame() {
  rollDice();
  document.querySelector('.number').textContent = '?';
  // starGame();
  gameEnd = false;
  guess = 0;
  score = 20;
  document.querySelector('.score').textContent = score;
}

// Needs to perssit a local storage when the page is reloaded in order to keep record of the highscore.
function cleanScore() {
  localStorage.clear();
}

/*

Start game

*/

function starGame() {
  dice = rollDice();
  //   document.querySelector('.score').textContent = score;
  document.querySelector('.highscore').textContent =
    localStorage.getItem('score');
  document.querySelector('.check').addEventListener('click', function () {
    // select value from the buttom
    guess = Number(document.querySelector('.guess').value);
    if (!guess) {
      document.querySelector('.message').textContent =
        'You must submit a number 1-20!';
    } else if (gameEnd === false) {
      if (verifyWin(guess, dice)) {
        showTip(guess);
      }
    }
  });
}
function changeBackgroundColor(gameEnd) {
  let color;
  gameEnd === false ? (color = '#222') : (color = '#60b347');
  document.querySelector('body').style.backgroundColor = color;
}

addEventListener('load', function () {
  cleanScore();
  changeBackgroundColor(gameEnd);
  starGame();
});

document.querySelector('.again').addEventListener('click', function () {
  resetGame();
  changeBackgroundColor(gameEnd);
});
