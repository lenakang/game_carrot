const field = document.querySelector('.game__field');
const carrots = document.querySelector('.game__carrots');
const bugs = document.querySelector('.game__bugs');
const btn_start = document.querySelector('.game__button');
const btn_refresh = document.querySelector('.pop-up__refresh');
const pop_up = document.querySelector('.pop-up');

function random(item){
    let x = Math.floor(Math.random() * 90);
    let y = Math.floor(Math.random() * 90);
    item.style.top = x + "%";
    item.style.left = y + "%";
}

function timer(){
    const timer = document.querySelector('.game__timer');
    let num = 10;
    timer.innerText = `0:${num}`;
    let interval = setInterval(()=>{
        num = num - 1;
        timer.innerText = `0:${num}`;
        if(num <= 0){
            clearInterval(interval);
            popup();
        }
    }, 1000)
}

function makeItems(){
    for(i=0;i<10;i++){
        let span = document.createElement('span');
        span.className = "carrot";
        span.id = Math.floor((new Date().valueOf() + Math.random())*1000);
        random(span);
        carrots.appendChild(span);
    }
    for(i=0;i<10;i++){
        let span = document.createElement('span');
        let bug = bugs.appendChild(span);
        random(bug);
    }

}


function start(){
    timer();
    makeItems();
}

function reStart(){
    start();
}

function popup(){
    pop_up.style.display = "flex";
}

function end(){
    clearInterval(interval);
    popup();
}

function counting(e){
    let this_id = e.currentTarget.id;
    console.log(this_id)    
    alert('d')
}

btn_start.addEventListener('click', ()=>{ start() });
btn_refresh.addEventListener('click', ()=>{ reStart() });


setTimeout(()=>{
    let item = document.querySelectorAll('.carrot');
    item.addEventListener('click',()=>{
        item.style.display = "none";
    })    
},1000)




