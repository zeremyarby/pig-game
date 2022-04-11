'use strict';

// Selecting Eleements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Switch Player Function
const switchPlayer = function () {
  // Resetting other player current score
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Switch Player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Switching active style
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Starting condition
let scores;
let dice;
let currentScore;
let activePlayer;
let playing;

// Starting Point
const start = function () {
  scores = [0, 0];
  dice = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
start();

// Rolling The Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating Random Number
    dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check if  dice=1 true then switch players
    if (dice !== 1) {
      // Add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold button handler
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.Add current score to active player score
    scores[activePlayer] += currentScore;
    // scores[1] = score[1] + currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;

    // 2. Check the score, if >= 100 player wins the game
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// New game button
btnNew.addEventListener('click', start);
