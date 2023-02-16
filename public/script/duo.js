const sum = document.querySelector('.summoner');
const bgc = document.querySelector('.background');
const sumOn = document.querySelector('.sum-on');
const sumOffs = document.querySelectorAll('.sum-off');
const body = document.querySelector('body');

sumOn.addEventListener('click',()=>{
    sum.classList.add('active');
    bgc.classList.add('active');
    body.classList.add('active');
})

for(sumOff of sumOffs){
    sumOff.addEventListener('click',()=>{
        sum.classList.remove('active');
        bgc.classList.remove('active');
        body.classList.remove('active');
    })
}
