const userEmail = document.querySelector('#userEmail');
const userEmailP = document.querySelector('.emailP');
const nickname = document.querySelector('#nickname');
const nicknameP = document.querySelector('.nicknameP');
const userPwd = document.querySelector('#userPwd');
const userPwdCon = document.querySelector('.pwdCon');
const nextBtn = document.querySelector('.next')

const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/img;
const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/img;
let emailToken = false;
let nicknameToken = false;
let pwdToken = false;

const url = 'http://localhost:3000/login/register/userInfo';

let userAry;

window.onload = function(){
    const userInfo =  {
        email : userEmail.value,
        nickname : nickname.value,
        pwd : userPwd.value
    }
    fetch(url, {
        method: 'POST', 
        body:JSON.stringify(userInfo),
        headers : {'Content-Type':'application/json;charset=utf-8'}
    })
    .then(res=>res.json())
    .then(res=>{
        userAry = res.message
    })
}

userEmail.addEventListener('keyup',function(){
    if(this.value.length > 0 &&!(emailRegex).test(this.value)){
        userEmailP.style.display = 'flex';
        userEmailP.innerHTML = '유효한 이메일 주소를 입력해 주시기 바랍니다.';
        emailToken = false;
        nextHandle();
    }else {
        userEmailP.style.display = 'none';
        emailToken = true;
        nextHandle();
    }
})
userEmail.addEventListener('blur',function(){
    if(userAry.find(user=> user.email == this.value)){
        userEmailP.style.display = 'flex';
        userEmailP.innerHTML = '이미 사용중이거나 탈퇴한 이메일 ID 입니다.';
        emailToken = false;
        nextHandle();
    }
})

nickname.addEventListener('keyup',function(){
    if(this.value.length > 0 && this.value.length < 3 || this.value.length > 20){
        nicknameP.style.display = 'flex';
        nicknameP.innerHTML = '최소 3자 이상 최대 20자 이하로 작성해주시기 바랍니다.';
        nicknameToken = false;
        nextHandle();
    }else {
        nicknameP.style.display = 'none';
        nicknameToken = true;
        nextHandle();
    }
})
nickname.addEventListener('blur',function(){
    if(userAry.find(user=> user.nickname == this.value)){
        nicknameP.style.display = 'flex';
        nicknameP.innerHTML = '이미 사용중인 닉네임입니다.';
        nicknameToken = false;
        nextHandle();
    }
})

userPwd.addEventListener('keyup',function(){
    if(this.value.length < 8 || !(pwdRegex).test(this.value)){
        userPwdCon.style.display = 'block';
        pwdToken = false;
        nextHandle();
    }else {
        userPwdCon.style.display = 'none';
        pwdToken = true;
        nextHandle();
    }
})

nextBtn.addEventListener('click',()=>{
    if(nextBtn.classList.contains('active')){
        const userInfo =  {
            email : userEmail.value,
            nickname : nickname.value,
            pwd : userPwd.value
        }
        fetch(url, {
            method: 'POST', 
            body:JSON.stringify(userInfo),
            headers : {'Content-Type':'application/json;charset=utf-8'}
        })
        .then(res=>res.json())
        .then(res=>console.log(res))
        location.href = '/login/register/done'               
    }
})

const nextHandle = function(){
    if(emailToken&&nicknameToken&&pwdToken){
        nextBtn.classList.add('active');
    }else {
        nextBtn.classList.remove('active');
    }
}
