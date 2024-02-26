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
  // console.log(`Score: ${score}`);
  document.querySelector('.score').textContent = score;
}

function verifyWin(guess, dice) {
  // console.log(dice === guess ? 'Sim:' + guess : 'Não: ' + guess);
  if (guess === dice) {
    // Won the game .number
    document.querySelector('.message').textContent = 'You win!';
    document.querySelector('.number').textContent = dice;
    setHighestScore(score);
    document.querySelector('.highscore').textContent =
      localStorage.getItem('score');
    gameEnd = true;
  } else if (score === 0) {
    // you lost  because you ran out of chances.
    console.log('Chegou em zero' + score);
    gameEnd = true;
    // document.querySelector('.message').textContent = "You're lose!";
    document.querySelector('.message').textContent = 'You lost! =)';
  } else {
    keepScore();
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
  console.log(dice);
  return dice;
}

function resetGame() {
  console.log('..........Jogo acabou, resetando..........');
  rollDice();
  document.querySelector('.number').textContent = '?';
  // starGame();
  gameEnd = false;
  guess = 0;
  score = 20;
  document.querySelector('.score').textContent = score;
  console.log(`Score: ${score}, Guess: ${guess}, GameEnd?: ${gameEnd}`);
  console.log(localStorage);
}

// Needs to perssit a local storage when the page is reloaded in order to keep record of the highscore.
function cleanScore() {
  localStorage.clear();
  console.log('storage limpo');
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
    console.log(`Score: ${score}, Guess: ${guess}, GameEnd?: ${gameEnd}`);
  });
}

addEventListener('load', function () {
  cleanScore();
  starGame();
});

document.querySelector('.again').addEventListener('click', function () {
  console.log('clicou no again');
  resetGame();
});
