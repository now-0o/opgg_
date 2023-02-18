const email = document.querySelector('.email');
const pwd = document.querySelector('.pwd');
const loginBtn = document.querySelector('.loginBtn');

email.addEventListener('keyup',()=>{
    if(email.value.length > 0 && pwd.value.length > 0){
        loginBtn.classList.add('active');
    }else {
        loginBtn.classList.remove('active');
    }
})
pwd.addEventListener('keyup',()=>{
    if(email.value.length > 0 && pwd.value.length > 0){
        loginBtn.classList.add('active');
    }else {
        loginBtn.classList.remove('active');
    }
})

function setCookieHandle(name, value, exp){
    let date = new Date();
	date.setTime(date.getTime() + exp*24*60*60*1000);
	document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

loginBtn.addEventListener('click',()=>{
    if(loginBtn.classList.contains('active')){
        const loginInfo =  {
            email : email.value,
            pwd : pwd.value
        }
        const url = 'http://localhost:3000/login';
        fetch(url, {
            method: 'POST', 
            body:JSON.stringify(loginInfo),
            headers : {'Content-Type':'application/json;charset=utf-8'}
        })
        .then(res=>res.json())
        .then(res=>{
            if(!res.success){
                alert(res.message)
                email.value = '';
                pwd.value = '';
            }else {
                setCookieHandle('nickname',res.message,1);
                location.href = '/index'
            }
        })              
    }
})