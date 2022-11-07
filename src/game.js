'use strict';
import {Field, ItemType} from './field.js';
import * as sound from './sound.js';

export const Reason = {
    win: 'win',
    lost: 'lost',
    cancel: 'cancel'
}

//builder pattern
export class GameBuilder {
    withGameDuration(duration){
        this.withGameDuration = duration;
        return this;
    }
    withCarrotCount(num){
        this.withCarrotCount = num;
        return this;
    }
    withBugCount(num){
        this.withBugCount = num;
        return this;
    }
    build(){
        return new Game(
            this.withGameDuration,
            this.withCarrotCount, 
            this.withBugCount
        )
    }
}

class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameScore = document.querySelector('.game__score');
        this.gameTimer = document.querySelector('.game__timer');
        this.btn = document.querySelector('.game__button');
        this.btn.addEventListener('click', ()=>{ 
            if (this.started){
                this.stop(Reason.cancel);
            }else{
                this.start();
            }
        });

        this.started = false;
        this.timer = undefined;
        this.score = 0;

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener((item)=>this.onItemClick(item));
    }

    start(){
        this.started = true;
        this.init();
        this.showStopBtn();
        this.showTimerAndScore();
        this.startTimer();
        sound.playBg();
    }
    stop(reason){
        this.started = false;
        this.stopTimer();
        this.hideBtn();
        sound.stopBg();
        this.func && this.func(reason);
    }

    showBtn(){
        this.btn.style.visibility = 'visible';  
    }
    hideBtn(){
        this.btn.style.visibility = 'hidden';
    }
    
    init(){
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
    }
    showTimerAndScore(){
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    startTimer(){
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(()=>{
            if(remainingTimeSec <= 0){
                clearInterval(this.timer);
                this.stop(Reason.lost);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }
    
    stopTimer(){
        clearInterval(this.timer);
    }
    
    showStopBtn(){
        this.btn.style.visibility = 'visible';
        const icon = this.btn.querySelector('.fa-solid');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-stop');
    }

    updateTimerText(time){
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }

    setStopListener(func){
        this.func = func;
    }

    onItemClick = (item) =>{
        if(!this.started){
            return;
        }
        if ( item.matches(`.${ItemType.carrot}`) ){
            sound.playCarrot();
            item.remove();

            this.score++;
            this.updateScoreBoard();

            if(this.score === this.carrotCount){
                this.stop(Reason.win);
            }
        }else if (item.matches(`.${ItemType.bug}`)){
            this.stop(Reason.lost);
        }
    }

    updateScoreBoard(){
        this.gameScore.innerText = this.carrotCount - this.score;
    }
}
