const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
});

userSchema.plugin(passportLocalMongoose);


const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
