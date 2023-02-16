const path = require('path');

const valorant = (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'valorant.html')); 
}
const duo = (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'duo.html')); 
}


module.exports = { valorant, duo }