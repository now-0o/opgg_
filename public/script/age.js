const ageInput = document.querySelector('.userInfo input');
const agelabel = document.querySelector('.userInfo label');
const nextBtn = document.querySelector('.next');
let birth = '';
ageInput.addEventListener('keyup',function(e){
    if(this.value.length == 8){
        birth = this.value
    }
    if(this.value.length > 0 && this.value.length != 8){
        agelabel.style.display = 'flex'
        agelabel.innerHTML = '생년월일 형식에 맞추어 입력해 주세요(년/월/일).'
    }else if(parseInt(birth.slice(4,6))>12 || parseInt(birth.slice(6,8))>31){
        agelabel.style.display = 'flex'
        agelabel.innerHTML = '생년월일 형식에 맞추어 입력해 주세요(년/월/일).'
    }else if(this.value.length == 0){
        agelabel.style.display = 'none'
    }
    else {
        agelabel.style.display = 'none'
        nextBtn.classList.add('active')
    }
})
nextBtn.addEventListener('click',()=>{
    if(nextBtn.classList.contains('active')){
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        const age = year - parseInt(birth.slice(0,4));
        if(age<14){
            alert('OP.GG 회원 서비스는 만 14세 이상만 이용하실 수 있습니다.')
        }else if(age == 14){
            if(parseInt(birth.slice(4,6)) > month){
                alert('OP.GG 회원 서비스는 만 14세 이상만 이용하실 수 있습니다.')
            }else if(parseInt(birth.slice(4,6)) == month){
                if(parseInt(birth.slice(6,8)) > day) {
                    alert('OP.GG 회원 서비스는 만 14세 이상만 이용하실 수 있습니다.')
                }else {
                    location.href = '/login/register2'
                }
            }else {
                location.href = '/login/register2'
            }
        }else {
            location.href = '/login/register2'
        }
    }
})