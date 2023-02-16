const path = require('path');

const login = (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html')); 
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


module.exports = { login, registerAge, registerAgree, registerInfo }