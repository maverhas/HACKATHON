const express = require('express')
const router = express.Router()
const User = require("../DATABASE/user")







router.get('/', (req, res) => {
    res.render("signup.ejs")
})
router.post('/', (req, res) => {
  if (!req.body.username || !req.body.password){
    res.render('/', {message: "Provide username and password"})
  } else {
    const user = User.insertMany({username: req.body.username, password: req.body.password })
    .then((docs)=>{
        console.log("Result :",docs);
    })
    .catch((err)=>{
        console.log(err);
    });
    req.session.username = req.body.username
    req.session.password = req.body.password
    req.session.save()
    res.redirect('/')
  }
})
module.exports = router