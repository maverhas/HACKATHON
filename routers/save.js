const express = require("express")
const router = express.Router()
const User = require("../DATABASE/user")


router.get('/', (req, res) => {
    res.render("save.ejs")
})

router.post("/", (req, res) => {
    const user = new User({username: req.body.username})
    User.insertMany(user).then((docs) => {console.log(docs)}).catch((err) => {console.log(err)})
    res.redirect("/")
})

module.exports = router