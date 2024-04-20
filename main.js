const express = require('express')
const app = express()
const path = require('path')
const port = 3000
app.set("views", path.join(__dirname, 'static', 'views'))
app.set("view engine", "ejs");
var login = require("./USERJS/login")
app.use("/login", login)

app.get('/', (req, res) => {
    res.send("Base")
})
app.listen(port, ()=> {
    console.log(`App running on port ${port}`)
})