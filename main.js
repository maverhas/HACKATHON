const express = require('express')
const path = require('path')
const session = require('express-session');
const level1Router = require('./routers/level1.js')
const level2Router = require('./routers/level2.js')
const level3Router = require('./routers/level3.js')
const level4Router = require('./routers/level4.js')
const app = express()
const port = 3000
const mongoose = require("mongoose")
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
var login = require("./routers/login.js")
var signup = require("./routers/signup.js")
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
app.use("/login", login)
app.use("/signup", signup)

const levels = [
    {  
        id: 1,
        code:'6702',
        url: '/levels/1',
        title: 'Niveau 1',
        hint: "Va plus loin que le bout de ton nez",
        category: 'Sténographie',
        description: "Remue toi les balôches on sent que t'as la pétoche",
    },
    {
        id: 2,
        code:'8034',
        url: '/levels/2',
        title: 'Niveau 2',
        description: 'Celui là va probablement te casser le crâne.',
        hint: ''
    },
    {  
        id: 3,
        code:'9952',
        url: '/levels/3',
        title: 'Niveau 3',
        description: 'Pas mal, mais bonne chance pour celui-ci',
        hint: ''
    },
    {  
        id: 4,
        code:'1717',
        url: '/levels/4',
        title: 'Niveau 4',
        description: "Wow, Impressionant ! Celui là est impossible.",
        hint: ''
    },
];

const findLevel = (id) => {
    for (const level of levels) {
        if (level.id === id) {
            return level;
        }
    }

    return null;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.static('static'));

app.set("views", path.join(__dirname, 'static', 'views'));
app.set("view engine", "ejs");

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use('/levels/1', level1Router);
app.use('/levels/2', level2Router);
app.use('/levels/3', level3Router);
app.use('/levels/4', level4Router);

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/quiz', (req, res) => {
    if (!req.session.level) {
        req.session.level = 1;
    }

    if (req.session.level > 4) {
        req.session.level = 1;
        res.render('win.ejs');
    }
    else {
        res.render('quiz.ejs', {
            'level': findLevel(req.session.level),
            'response': res,
        });
    }
});

app.post('/submit', (req, res) => {
    if (!req.session.level) {
        return res.status(403).redirect('/');
    }
    
    const level = findLevel(req.session.level);
    if (!level) {
        return res.status(404).redirect('/');
    }

    const code = req.body.code;
    if (code !== level.code) {
        return res.json({
            error: true,
            reason: 'Wrong code.',
        });
    }

    req.session.level += 1;

    return res.json({
        error: false,
        reason: '',
    });
});

app.get('/leaderboard', (req, res) => {
    res.render('leaderboard.ejs');
})

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
