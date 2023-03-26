const path = require('path');
const fs = require('fs');

const connection = require('../model/db');
const pool = connection();

const login = (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html')); 
}

// json 파일를 사용하여 로그인
// const loginPost = (req,res)=>{
//     const dataBuffer = fs.readFileSync(path.join(__dirname, '..', 'model', 'user.json'));
//     let userAry = JSON.parse(dataBuffer.toString());
//     loginInfo = req.body;
//     console.log(loginInfo.email)
//     let resData = {};
//     const idCheck = userAry.find(user => user.email == loginInfo.email)
//     const pwdCheck = userAry.find(user => user.pwd == loginInfo.pwd)
//     if(idCheck && pwdCheck){
//         resData = {success : true , message : idCheck.nickname}
//     }else {
//         resData = {success : false , message : 'OP.GG ID가 존재하지 않거나 비밀번호가 일치하지 않습니다. 다시 시도해주세요.'}
//     }
//     res.send(resData)
// }

// db를 사용하여 로그인
const loginPost = async (req, res)=>{
    const { email, pwd } = req.body;
    console.log( email, pwd);

    let conn; 
    try{
        conn = await pool.getConnection(); 
        const sql = `SELECT count(*) as cnt FROM USER WHERE email=? AND pwd=?;`;
        const rows = await conn.query(sql, [email, pwd]);
        // console.log( rows[0].cnt )
        // 
        let resData = {}
        if( parseInt(rows[0].cnt) !== 1 ){
            resData = { success : false, message : '아이디 또는 비밀번호를 확인하세요.'}
            return res.send(resData);
        }else{
            const sql2 = `SELECT * FROM USER WHERE email=? AND pwd=?;`;
            const rows2 = await conn.query(sql2, [email, pwd]);
            resData = { success : true, message : rows2[0].nickname }
            res.send(resData);
        }
        
    }catch(err){
        console.log(err);
    }finally{
        if(conn) conn.end();
    }
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

// json 파일을 사용하여 회원 가입
// const registerInfoPost = (req,res)=>{
//     const dataBuffer = fs.readFileSync(path.join(__dirname, '..', 'model', 'user.json'));
//     let userAry = JSON.parse(dataBuffer.toString());
//     let userInfo = req.body;
//     if(userInfo.email == ''){
//         resData = {success : true , message : userAry}
//     }else {
//         userAry.push(userInfo);
//         console.log(userAry);
//         fs.writeFileSync(path.join(__dirname, '..', 'model', 'user.json'),JSON.stringify(userAry),'utf-8');
//         resData = {success : true , message : userInfo}
//     }
//     res.send(resData)
// }

// db를 사용하여 회원가입
const registerInfoPost = async (req,res)=>{ 
    const { email, pwd, nickname } = req.body;
    console.log( email, pwd, nickname);
    // data는 register에 저장하지 않고  users 저장할 것이므로 users에 저장할 데이터만 사용할 것임

    let conn; 
    try{
        conn = await pool.getConnection(); 
        const sql = `SELECT count(*) as cnt FROM USER WHERE  email=?;`;
        const rows = await conn.query(sql, [email]);
        // console.log( rows[0].cnt )
        // 
        let resData = {}
        if( parseInt(rows[0].cnt) === 1 ){
            resData = { success : false, message : '이미 가입 되어있는 이메일 입니다.'}
            return res.send(resData);
        }else{
            const sql2 = `INSERT INTO USER(email, pwd, nickname) VALUES(?,?,?);`;
            const rows2 = await conn.query(sql2, [email, pwd, nickname]);
            resData = { success : true, message : '회원가입이 완료되었습니다.'  }
            return res.send(resData);
        }
        
    }catch(err){
        console.log(err);
    }finally{
        if(conn) conn.end();
    }
}

const registerdone = (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'done.html')); 
}



module.exports = { login, loginPost, registerAge, registerAgree, registerInfo, registerInfoPost, registerdone }