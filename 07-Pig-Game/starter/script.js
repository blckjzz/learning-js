'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

diceEl.classList.add('hidden');

let currentScore = 0;
let nowPlaying = 0;
let playingBefore = 0;
let currentPlayer = {};
const maxPoints = 25;
let dice = 0;

let player0 = {
  totalScore: 0,
};

let player1 = {
  totalScore: 0,
};

btnRoll.addEventListener('click', function () {
  play();
});

btnHold.addEventListener('click', function () {
  hold();
});

function play() {
  dice = rollDice();
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  if (dice !== 1) {
    currentScore += dice;
    keepScore(dice);
    let nowPlayngCurrentScore = document.getElementById(
      `current--${nowPlaying}`
    );
    nowPlayngCurrentScore.textContent = currentScore;
  } else {
    let rolledScoreElement = document.getElementById(`score--${nowPlaying}`);
    let currentPlayer = player(nowPlaying);
    currentPlayer.totalScore = 0;
    rolledScoreElement.textContent = currentPlayer.totalScore; // if dice is === 1 personal record must be set to zero (lose all points)
    switchPlayer();
  }
  verifyWinner();
}

function rollDice() {
  return Math.floor(Math.random() * (6 - 1) + 1);
}

function switchPlayer() {
  // console.log(`The score before switching: ${currentScore}`);
  currentScore = 0; // delete the current score before switching
  document.getElementById(`current--${nowPlaying}`).textContent = currentScore;
  let playingBefore = nowPlaying;
  nowPlaying === 0 ? (nowPlaying = 1) : (nowPlaying = 0);
  currentPlayer = player(playingBefore);
  let rolledScoreElement = document.getElementById(`score--${playingBefore}`);
  rolledScoreElement.textContent = currentPlayer.totalScore;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function keepScore(value, scoreToZero = false) {
  if (scoreToZero === true) {
    nowPlaying === 0 ? (player0.totalScore = 0) : (player1.totalScore = 0);
  } else {
    nowPlaying === 0
      ? (player0.totalScore += value)
      : (player1.totalScore += value);
  }

  // console.log(`Player 0 score: [${player0.totalScore}]`);
  // console.log(`Player 1 score: [${player1.totalScore}]`);
}

function player(nowPlaying) {
  return nowPlaying === 0 ? player0 : player1;
}

function hold(nowPlaying) {
  switchPlayer();
  keepScore(currentScore);
}

function verifyWinner() {
  if (player0.totalScore >= maxPoints || player1.totalScore >= maxPoints) {
    let p = player(nowPlaying);
    console.log(
      `Player${nowPlaying} rolled ${dice} and WON THE GAME! WITH the Score of {${p.totalScore}}. Do you want to play again?`
    );
    if (
      alert(
        `Player${nowPlaying} WON THE GAME! WITH the Score of {${p.totalScore}}. click ok to play again!`
      )
    ) {
    } else window.location.reload();
  }
}
