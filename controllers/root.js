const path = require('path');

const index = (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html')); 
}
const indexChamp = (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views','subdir', 'index_champ.html')); 
}
const summoners = (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'summoners.html')); 
}

module.exports = { index, indexChamp, summoners }