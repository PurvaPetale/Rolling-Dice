'use strict';

// ---Selecting the elements---// for id you can also use getElementById instead of querySelector

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEL.classList.add('hidden');

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0; // player 1 -- 0 and player 2 -- 1
// let playing = true;
let scores, currentScore, activePlayer, playing;

// init function  -reusable function
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // player 1 -- 0 and player 2 -- 1
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEL.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// Switching player function

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); // toggle will add player--active class if it's not there otherwise  it will remove it if it's there
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate random no.
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. show the dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // 3. cheaked for 1
    if (dice !== 1) {
      // add score to existing one
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; // CHANGE LATER
    } else {
      // switch the player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player's score // ex - scores[1] = scores[1]+currentScore
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if score is >= 100 if it is active player wins
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch the player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
}); // or btnNew.addEventListner('click',init)
