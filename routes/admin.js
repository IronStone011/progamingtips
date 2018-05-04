// Tools
const express = require("express"),
      router  = express.Router(),
      passport = require("passport");

// Models
   // var User = require("../models/user");
   var Post = require("../models/post");
   var User = require("../models/user");
// middleware
var middleware = require("../middleware/auth");
// Routes
   router.get("/", middleware.isAdmin ,function(req ,res ) {
        User.find({}, function(err, allusers){
       if(err){
           console.log(err);
       } else {
          res.render("admin",{users:allusers});
       }
    });
  });
// Creating new Post
      router.post("/new", middleware.isAdmin , function(req, res) {
             var title = req.body.title,
              content = req.body.content,
              category = req.body.category,
              intro = req.body.intro,
              premium = Boolean;
              if (req.body.pr == "true"){premium = true} else {premium = false}
              var newPost = {title:title, content:content, category:category, premium:premium, intro:intro};
            Post.create(newPost, function(err, newlyCreated){
              if(err){
                  
                  res.send(err);
              } else {
                  // console.log(newlyCreated);
                  res.redirect("/admin");
              }
          });
              
      });
      
// Changing User Premissions
    router.put("/user/changeaccsess", middleware.isAdmin , function(req, res){
        // A.findByIdAndUpdate(id, update, callback)
        User.findByIdAndUpdate(req.body.userid, {premium:req.body.premiumstate}, function (err, updated){
            if (err) {res.send(err)} else {
                res.redirect("/admin");
            }
        });
    });
//  Exporting

module.exports = router;

// 