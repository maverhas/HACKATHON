const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const session = require('express-session')
const uri = "mongodb+srv://verhasseltmartin:FAw0Jf9YIKiZPBiz@dbhackathon.hv5fgna.mongodb.net/?retryWrites=true&w=majority&appName=DBHACKATHON";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
router.get('/', (req, res) => {
    res.render("login.ejs")
})
router.post('/', (req, res) => {
  if (!req.body.username || !req.body.password){
    res.render('/', {message: "Provide username and password"})
  } else {
    res.send("Yes")
  }
})
module.exports = router