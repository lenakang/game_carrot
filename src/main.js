'use strict';
import {GameBuilder, Reason} from './game.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

const finishBanner = new PopUp();

const game = new GameBuilder()
    .withGameDuration(3)
    .withCarrotCount(3)
    .withBugCount(3)
    .build();

game.setStopListener((reason)=>{
    let message;
    switch(reason){
        case Reason.cancel:
            message = 'Replay?';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'you won!👏';
            sound.playWin();
            break;
        case Reason.lost:
            message = 'You lost...';
            sound.playBug();   
            break;
        default:
            throw new Error('not valid reason');
    }
    finishBanner.showWithText(message);
});

finishBanner.setClickListener(()=>{
    game.start();
});
