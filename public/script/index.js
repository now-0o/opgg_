const lightBtn = document.querySelector('.lightBtn');
const body = document.querySelector('body');
const download = document.querySelector('.download');
const searchBox = document.querySelector('.search-box');
const adBox = document.querySelector('.adBox');
const boardBox = document.querySelector('.boardBox');
const boardCon = document.querySelectorAll('.board-content');
const footerLogo = document.querySelector('.footer-logo');
const login = document.querySelector('.login');
const loginBox = document.querySelector('.loginBox');
const logoutBox = document.querySelector('.logoutBox');

let imgCount = true;
let nickname = undefined;
window.onload = function(){
    const allCookies = document.cookie.split(';');
    allCookies.forEach(cookie=>{
        if(cookie.includes('nickname')){
            nickname = cookie.split('=')[1];
        }
    })
    console.log(nickname)
    if(!nickname){
        login.style.display = 'block'
        loginBox.style.display = 'none'
    }else {
        login.style.display = 'none'
        loginBox.style.display = 'flex'
        loginBox.childNodes[1].innerHTML = nickname;
    }
}

lightBtn.addEventListener('click',function(){
    body.classList.toggle('active');
    download.classList.toggle('active');
    searchBox.classList.toggle('active');
    adBox.classList.toggle('active');
    boardBox.classList.toggle('active');
    if(imgCount == true) { 
        lightBtn.setAttribute('src','./images/icon-darkmode.svg');
        footerLogo.setAttribute('src','./images/icon-opgglogo-gray.svg');
        imgCount = false;
    }
    else {
        lightBtn.setAttribute('src','./images/icon-lightmode.svg');
        footerLogo.setAttribute('src','./images/opgglogo.svg');
        imgCount = true;
    }
    boardCon.forEach(function(board,i){
        board.classList.toggle('active');
    })
})
const lnbBtn = document.querySelector('.lnb-btn')
const gnbBtn = document.querySelector('.gnb-btn')
const lnbOff = document.querySelector('.lnb-off')
const gnbOff = document.querySelector('.gnb-off')
const gnbSlide = document.querySelector('.gnb-slide')
const lnbModal = document.querySelector('.lnb-modal')
const background = document.querySelector('.background')

lnbBtn.addEventListener('click',function(){
    lnbModal.classList.add('active');
    background.classList.add('active');
})
lnbOff.addEventListener('click',function(){
    lnbModal.classList.remove('active');
    background.classList.remove('active');
})

gnbBtn.addEventListener('click',function(){
    gnbSlide.classList.add('active');
})
gnbOff.addEventListener('click',function(){
    gnbSlide.classList.remove('active');
})

function setCookieHandle(name){
    document.cookie = `Name=${name};max-age=${60*60}`;  
}

const mainSearch = document.querySelector('.mainSearch')

mainSearch.addEventListener('keydown',function(e){
    if(e.keyCode == 13){
        e.preventDefault();
        setCookieHandle(`${mainSearch.value}`);
        location.href = `/summoners`;
    }
})

loginBox.addEventListener('click',()=>{
    logoutBox.classList.toggle('active')
})

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}
logoutBox.addEventListener('click',()=>{
    deleteCookie('nickname')
    location.reload();
})
