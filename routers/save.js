const express = require("express")
const router = express.Router()
const User = require("../DATABASE/user")


router.get('/', (req, res) => {
    req.session.time = new Date().getTime() - req.session.time 
    console.log("It took that time")
    console.log(req.session.time)
    res.render("save.ejs")
})

router.post("/", (req, res) => {
    const user = new User({username: req.body.username})
    User.insertMany(user).then((docs) => {console.log(docs)}).catch((err) => {console.log(err)})
    res.redirect("/")
})

module.exports = router