const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const mongoose = require("mongoose")
const session = require('express-session')
const uri = "mongodb+srv://verhasseltmartin:Inajoy_2024@dbhackathon.hv5fgna.mongodb.net/?retryWrites=true&w=majority&appName=DBHACKATHON";
mongoose.connect(uri)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.set("views", path.join(__dirname, 'static', 'views'))
app.set("view engine", "ejs");
app.use(t)
var login = require("./USERJS/login")
var signup = require("./USERJS/signup")
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
app.use("/login", login)
app.use("/signup", signup)

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/quiz', (req, res) => {
    res.render('quiz.ejs');
})

app.get('/leaderboard', (req, res) => {
    res.render('leaderboard.ejs');
})

app.get('/level1', (req, res) => {
    res.render('level1.ejs');
})

app.listen(port, ()=> {
    console.log(`App running on port ${port}`)
})