const mongoose = require("mongoose")
const {Schema} = mongoose
const UserSchema = new Schema({
  username: String, 
  HighestScore: Number
})
module.exports = mongoose.model("User", UserSchema)