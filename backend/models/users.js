const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    unique: true,
  },
  name: String,
  passwordHash: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;
