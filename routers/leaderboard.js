const express = require("express")
const router = express.Router()
const User = require("../DATABASE/user")

router.get('/', (req, res) => {
    const user = User.find()
    .then((docs) => {
        res.render("leaderboard.ejs", {user: docs})
    })
    .catch((err)=>{console.log(err)})
    
        
})

module.exports = router