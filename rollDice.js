
const START_PLAYER = 1;
const DEFAULT_TARGET_SCORE = 100;
const DOUBLE_SIX = 12;
const LOSER_MSG = "Passed the target score";
const WIN_MSG = "You Win!";
const WIN_MSG_COLOR = '#b4235a';
const LOSER_MSG_COLOR = '#000000';
const WIN_BACKGROUND_COLOR = '#000000';
const LOSER_BACKGROUND_COLOR = '#d5a9ba';
const PLAYER1 = "p1";
const PLAYER2 = "p2";
const MINIMUM_POINTS = 2;
const DEFAULT_COLOR_P1_CLASS = '#d5a9ba';
const DEFAULT_COLOR_P2_CLASS = '#b37398';
const DEFAULT_COLOR_PLAYER_TEXT = '#000000';
const DEFAULT_COLOR_PLAYER_WIN_STATUS = '#9e2247';
const CURRENT_PLAYER_COLOR = '#d5a9ba';
const WAITING_PLAYER_COLOR = '#b37398';

const cube1 = document.getElementById('cube1');
const cube2 = document.getElementById('cube2');
const rollDiceBtn = document.getElementById('rollDice');
const holdBtn = document.getElementById('hold');
const currentScoreP1 = document.getElementById('currentScoreP1');
const currentScoreP2 = document.getElementById('currentScoreP2');
const playerScore1 = document.getElementById('playerScore1');
const playerScore2 = document.getElementById('playerScore2');
const p1WinStatus = document.getElementById('p1WinStatus')
const p2WinStatus = document.getElementById('p2WinStatus')
const p1Text = document.getElementById('p1Text')
const p2Text = document.getElementById('p2Text')
const p1Class = document.querySelectorAll('.p1')[0];
const p2Class = document.querySelectorAll('.p2')[0];
const startGame = document.getElementById('startGame');
const points = document.getElementById('points');
const welcomeScreen = document.querySelectorAll('.welcome-screen')[0];
const newGame = document.getElementById('newGame');

let currentScoreP1Num = 0;
let currentScoreP2Num = 0;
let playerScore1Num = 0;
let playerScore2Num = 0;
let targetScore = DEFAULT_TARGET_SCORE;
let currentPlayer = START_PLAYER;


const rollDice = () => {
    const rand1 = Math.floor(Math.random() * 6) + 1;
    cube1.setAttribute('style', "background-image:url(./assets/images/dice-" + `${rand1}` + '.png)');

    const rand2 = Math.floor(Math.random() * 6) + 1;
    cube2.setAttribute('style', "background-image:url(./assets/images/dice-" + `${rand2}` + '.png)');

    return rand1 + rand2;
}

const gameOver = (playerLoser) => {

    holdBtn.disabled = true;
    rollDiceBtn.disabled = true;

    playerScore1.innerText = currentScoreP1Num + playerScore1Num;
    playerScore2.innerText = currentScoreP2Num + playerScore2Num;

    if (playerLoser === PLAYER1) {
        p1WinStatus.innerText = LOSER_MSG;
        p2WinStatus.innerText = WIN_MSG;
        p1WinStatus.style.cssText = `color: ${LOSER_MSG_COLOR}`;
        p2WinStatus.style.cssText = `color: ${WIN_MSG_COLOR}`;
        currentScoreP1.innerText = 0;
        p2Text.style.color = WIN_MSG_COLOR;
        p2Class.style.cssText = `background-color: ${WIN_BACKGROUND_COLOR}`;
        p1Class.style.cssText = `background-color: ${LOSER_BACKGROUND_COLOR}`;


    }
    else {
        p2WinStatus.innerText = LOSER_MSG;
        p1WinStatus.innerText = WIN_MSG;
        p2WinStatus.style.cssText = `color: ${LOSER_MSG_COLOR}`;
        p1WinStatus.style.cssText = `color: ${WIN_MSG_COLOR}`;
        currentScoreP2.innerText = 0;
        p1Text.style.color = WIN_MSG_COLOR;
        p1Class.style.cssText = `background-color: ${WIN_BACKGROUND_COLOR}`;
        p2Class.style.cssText = `background-color: ${LOSER_BACKGROUND_COLOR}`;


    }

}

const switchPlayer = () => {
    if (!holdBtn.disabled) {
        holdBtn.disabled = true;
    }

    if (currentPlayer === 1) {

        playerScore1Num += currentScoreP1Num;
        playerScore1.innerText = playerScore1Num;
        currentScoreP1Num = 0;
        currentScoreP1.innerText = 0;
        p2Class.style.cssText = `background-color: ${CURRENT_PLAYER_COLOR}`;
        p1Class.style.cssText = `background-color: ${WAITING_PLAYER_COLOR}`;

        if (playerScore1Num > targetScore) {
            gameOver(PLAYER1);
        }

    }
    else {
        playerScore2Num += currentScoreP2Num;
        playerScore2.innerText = playerScore2Num;
        currentScoreP2Num = 0;
        currentScoreP2.innerText = 0;

        p1Class.style.cssText = `background-color: ${CURRENT_PLAYER_COLOR}`;
        p2Class.style.cssText = `background-color: ${WAITING_PLAYER_COLOR}`;

        if (playerScore2Num > targetScore) {
            gameOver(PLAYER2);
        }

    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;

}


const resetScreen = () => {
    p1WinStatus.innerText = "";
    p2WinStatus.innerText = "";
    p1WinStatus.style.cssText = `color: ${DEFAULT_COLOR_PLAYER_WIN_STATUS}`;
    p2WinStatus.style.cssText = `color: ${DEFAULT_COLOR_PLAYER_WIN_STATUS}`;
    currentScoreP1.innerText = 0;
    currentScoreP2.innerText = 0;
    playerScore1.innerText = 0;
    playerScore2.innerText = 0;
    playerScore1Num = 0;
    playerScore2Num = 0;
    currentScoreP1Num = 0;
    currentScoreP2Num = 0;
    currentPlayer = START_PLAYER;
    p1Text.style.cssText = `color: ${DEFAULT_COLOR_PLAYER_TEXT}`;
    p2Text.style.cssText = `color: ${DEFAULT_COLOR_PLAYER_TEXT}`;
    p2Class.style.cssText = `background-color: ${DEFAULT_COLOR_P2_CLASS}`;
    p1Class.style.cssText = `background-color: ${DEFAULT_COLOR_P1_CLASS}`;

}
rollDiceBtn.addEventListener('click', function (event) {
    const sum = rollDice();

    if (holdBtn.disabled) {
        holdBtn.disabled = false;
    }


    if (currentPlayer === 1) {

        if (sum === DOUBLE_SIX) {
            currentScoreP1Num = 0;
            switchPlayer();

        }
        else {
            currentScoreP1Num += sum;
        }

        currentScoreP1.innerText = currentScoreP1Num;

        if (currentScoreP1Num > targetScore) {
            gameOver(PLAYER1);
        }
        else if (playerScore1Num + currentScoreP1Num === targetScore) {
            gameOver(PLAYER2);
        }

    }
    else {

        if (sum === DOUBLE_SIX) {
            currentScoreP2Num = 0;
            switchPlayer();

        }
        else {
            currentScoreP2Num += sum;
        }

        currentScoreP2.innerText = currentScoreP2Num;
        if (currentScoreP2Num > targetScore) {
            gameOver(PLAYER2);
        }
        else if (playerScore2Num + currentScoreP2Num === targetScore) {
            gameOver(PLAYER1);
        }
    }
})


holdBtn.addEventListener('click', function (event) {

    switchPlayer();

})

startGame.addEventListener('click', function (event) {

    if (points.value >= MINIMUM_POINTS) {
        targetScore = points.value;
        welcomeScreen.style.cssText = 'display: none';

    }

});

newGame.addEventListener('click', function (event) {

    resetScreen();
    welcomeScreen.style.cssText = 'display: inline';
    rollDiceBtn.disabled = false;

});

const initGame = () => {
    rollDice();

}

initGame();

