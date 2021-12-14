//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const md5 = require('md5');

const app = express();


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;


mongoose.connect(process.env.DB_URL);

const studentSchema = new mongoose.Schema({
    email: String,
    password: String
});

const student = new mongoose.model('Student', studentSchema);
 


app.get('/', (req,res) => {
    res.render('home')
})

app.get('/register', (req,res) => {
    res.render('register')
})

app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/register',(req,res)=>{
    const newStudent = new student({
        email: req.body.username,
        password: md5(req.body.password)
    });

    newStudent.save();
    res.render('secrets');
})

app.post('/login', (req, res)=>{
    email = req.body.username;
    password = md5(req.body.password);

    student.findOne({ email:email}, (err, findStudent) => {
        if (err) {
            console.log(err);
        }
        else{
            if (findStudent){
                if (findStudent.password === password){
                    res.render('secrets');
                } else{
                    res.render('home');
                }
            }
            

        }
    })
})








app.listen(port, ()=>{
    console.log("Server is listening on port " + port);
});