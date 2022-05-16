let counter;
const timeCount=document.querySelector('timer');

let timeValue=15;

function startTimer(time){
   counter=setInterval(timer,1000)
   function timer(){
      timeCount.textContent=time;
     time--; 
   }
}