const path = require('path');
const fs = require('fs');

const login = (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html')); 
}
const loginPost = (req,res)=>{
    const dataBuffer = fs.readFileSync(path.join(__dirname, '..', 'model', 'user.json'));
    let userAry = JSON.parse(dataBuffer.toString());
    loginInfo = req.body;
    console.log(loginInfo.email)
    let resData = {};
    const idCheck = userAry.find(user => user.email == loginInfo.email)
    const pwdCheck = userAry.find(user => user.pwd == loginInfo.pwd)
    if(idCheck && pwdCheck){
        resData = {success : true , message : idCheck.nickname}
    }else {
        resData = {success : false , message : 'OP.GG ID가 존재하지 않거나 비밀번호가 일치하지 않습니다. 다시 시도해주세요.'}
    }
    res.send(resData)
}
const registerAge = (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'age.html')); 
}
const registerAgree = (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'agree.html')); 
}
const registerInfo = (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'userInfo.html')); 
}
const registerInfoPost = (req,res)=>{
    const dataBuffer = fs.readFileSync(path.join(__dirname, '..', 'model', 'user.json'));
    let userAry = JSON.parse(dataBuffer.toString());
    userInfo = req.body;
    userAry.push(userInfo);
    console.log(userAry);
    fs.writeFileSync(path.join(__dirname, '..', 'model', 'user.json'),JSON.stringify(userAry),'utf-8');
    const resData = {success : true , message : userInfo}
    res.send(resData)
}
const registerdone = (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'done.html')); 
}



module.exports = { login, loginPost, registerAge, registerAgree, registerInfo, registerInfoPost, registerdone }