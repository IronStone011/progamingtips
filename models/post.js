var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
   title: String,
   content: String,
   category: String,
   premium: Boolean,
   intro: String,
   author: {type: String, default:'Pro Gaming Tips'}
    
});

module.exports = mongoose.model("Post", campgroundSchema);