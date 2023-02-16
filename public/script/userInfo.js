const userEmail = document.querySelector('#userEmail');
const userEmailP = document.querySelector('.emailP');
const nickname = document.querySelector('#nickname');
const nicknameP = document.querySelector('.nicknameP');
const userPwd = document.querySelector('#userPwd');
const userPwdCon = document.querySelector('.pwdCon');
const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/img;
const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/img;
userEmail.addEventListener('keyup',function(){
    if(this.value.length > 0 &&!(emailRegex).test(this.value)){
        userEmailP.style.display = 'flex';
        userEmailP.innerHTML = '유효한 이메일 주소를 입력해 주시기 바랍니다.';
    }else {
        userEmailP.style.display = 'none';
    }
})

nickname.addEventListener('keyup',function(){
    if(this.value.length > 0 && this.value.length < 3 || this.value.length > 20){
        nicknameP.style.display = 'flex';
        nicknameP.innerHTML = '최소 3자 이상 최대 20자 이하로 작성해주시기 바랍니다.';
    }else {
        nicknameP.style.display = 'none';
    }
})

userPwd.addEventListener('keyup',function(){
    if(this.value.length < 8 || !(pwdRegex).test(this.value)){
        userPwdCon.style.display = 'block';
    }else {
        userPwdCon.style.display = 'none';
    }
})