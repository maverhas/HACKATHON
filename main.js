const express = require('express')
const app = express()
const port = 3000

var login = require("./USERJS/login")
app.use("/login", login)

app.get('/', (req, res) => {
    res.send("Base")
})
app.listen(port, ()=> {
    console.log(`App running on port ${port}`)
})