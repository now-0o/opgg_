const nextBtn = document.querySelector('.next');
const allCheck = document.querySelector('#allCheck');
const useAgree = document.querySelector('#useAgree');
const userInfoAgree = document.querySelector('#userInfoAgree');

allCheck.addEventListener('change',()=>{
    if(allCheck.checked){
        useAgree.checked = true;
        userInfoAgree.checked = true;
        nextBtn.classList.add('active');
    }else {
        useAgree.checked = false;
        userInfoAgree.checked = false;
        nextBtn.classList.remove('active');
    }
})

useAgree.addEventListener('change',()=>{
    if(useAgree.checked && userInfoAgree.checked){
        allCheck.checked = true;
        nextBtn.classList.add('active');
    }
    if(!useAgree.checked || !userInfoAgree.checked){
        allCheck.checked = false;
        nextBtn.classList.remove('active');
    }
})
userInfoAgree.addEventListener('change',()=>{
    if(useAgree.checked && userInfoAgree.checked){
        allCheck.checked = true;
        nextBtn.classList.add('active');
    }
    if(!useAgree.checked || !userInfoAgree.checked){
        allCheck.checked = false;
        nextBtn.classList.remove('active');
    }
})

nextBtn.addEventListener('click',()=>{
    if(nextBtn.classList.contains('active')){
        location.href = '/login/register/userInfo';
    }
})