'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popup = document.querySelector('.pop-up');
const popupText = document.querySelector('.pop-up__message');
const popupRefresh = document.querySelector('.pop-up__refresh');

let started = false;
let score = 0;
let timer = undefined;

const carrot_audio = new Audio('./sound/carrot_pull.mp3');
const bug_audio = new Audio('./sound/bug_pull.mp3');
const win_audio = new Audio('./sound/game_win.mp3');
const bg_audio = new Audio('./sound/bg.mp3');
const alert_audio = new Audio('./sound/alert.wav');

gameBtn.addEventListener('click', ()=>{ 
    if (started){
        stopGame();
    }else{
        startGame();
        showStopBtn();
        showTimerAndScore();
        startGameTimer();
    }
    started = !started;
});

popupRefresh.addEventListener('click', ()=>{
    started = !started;
    startGame();
    startGameTimer();
    showGameBtn();
    popup.style.display = 'none';
});

field.addEventListener('click', (event)=>{
    onFieldClick(event)
});

function startGame(){
    playSound(bg_audio);
    initGame();
}
function showStopBtn(){
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play')
}
function stopGame(){
    stopSound(bg_audio);
    stopGameTimer();
    hideGameBtn();
    showPopUpWithText('replay?');
    playSound(alert_audio)
}
function showTimerAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}
function hideGameBtn(){
    gameBtn.style.visibility = 'hidden';
}
function showGameBtn(){
    gameBtn.style.visibility = 'visible';  
}
function startGameTimer(){
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=>{
        if(remainingTimeSec <= 0){
            clearInterval(timer);
            finishGame(false);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}
function stopGameTimer(){
    clearInterval(timer);
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}

function updateTimerText(time){
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(text){
    popup.style.display = 'flex';
    popupText.innerText = text;
}

function initGame(){
    score = 0;
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    // 당근과 벌레를 생성한 뒤 field에 추가
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for (let i=0; i<count; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1,x2);
        const y = randomNumber(y1,y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min,max){
    return Math.random() * (max - min) + min;
}

function onFieldClick(event){
    if(!started){
        return;
    }
    const target = event.target;
    if (target.matches('.carrot') ){
        playSound(carrot_audio);
        target.remove();
        score++;
        updateScoreBoard();
        if(score === CARROT_COUNT){
            finishGame(true);
        }
    }else if (target.matches('.bug')){
        playSound(bug_audio);
        finishGame(false);
    }
}

function updateScoreBoard(){
    gameScore.innerText = CARROT_COUNT - score;
}

function finishGame(win){
    stopGameTimer();
    stopSound(bg_audio);
    started = false;
    hideGameBtn();
    popup.style.display = 'flex';
    showPopUpWithText( win ? 'you won!👏' : 'you lost...');
    if(win){
        playSound(win_audio);
    }else{
        playSound(bug_audio);     
    }
}