'use strict';

export default class PopUp {
    constructor(){
        this.popup = document.querySelector('.pop-up');
        this.popupText = document.querySelector('.pop-up__message');
        this.popupRefresh = document.querySelector('.pop-up__refresh');
        this.popupRefresh.addEventListener('click', ()=>{
            this.onClick && this.onClick();
            this.hide();
        });
    }

    hide(){
        this.popup.style.display = 'none';
    }

    showWithText(text){
        this.popup.style.display = 'flex';
        this.popupText.innerText = text;
    }

    setClickListener(onClick){
        this.onClick = onClick;
    }
}