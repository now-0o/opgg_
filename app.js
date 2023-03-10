const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors')
let userInfo = {};

const root = require('./routes/root')
const login = require('./routes/login')
const topmenu = require('./routes/topmenu')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'model')));
app.use(express.json());
app.use(express.urlencoded({extended :false}));

app.use(cors({
    origin: '*'
}))
app.use('/' , root);
app.use('/login' , login);
app.use('/' , topmenu);

app.get('/*', (req, res)=>{
    res.send('file not found');
})

app.listen(3000, ()=>{
    console.log('app listening ', 3000);
})