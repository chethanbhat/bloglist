const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");
const uniqueValidator = require("mongoose-unique-validator");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [String],
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Apply the uniqueValidator plugin to userSchema.
blogSchema.plugin(uniqueValidator);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
