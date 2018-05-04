// Tools
const express = require("express"),
      router  = express.Router();
    //   passport = require("passport");

// Models
    var User = require("../models/user");
    var Post = require("../models/post");
// middleware
var middleware = require("../middleware/auth");
// Routes
// All Posts Showing
router.get("/", function(req, res) {
   Post.find({}, function(err, allPosts){
       if(err){
           console.log(err);
       } else {
          res.render("index",{posts:allPosts});
        // res.send(allPosts);
       }
    }); 
});
// Post Showing
router.get("/:id", function (req, res) {
    Post.findById(req.params.id, function (err, chocolate) {
        if(err) {res.send(err)} else {
            if(chocolate.premium == true){
                    if(req.user !== undefined && req.user.premium == true){
                        res.render("showpost", {post: chocolate});
                    } else {
                        req.flash("error", "You need to be Premium");
                        res.redirect("/premium");
                    }
            }else {
                res.render("showpost", {post: chocolate});
            }
        }
    });
});
// Post Editing Form
router.get("/:id/edit",middleware.isAdmin ,function (req, res){
   Post.findById(req.params.id, function (err, vanilla) {
      if (err) {res.send(err)} else {
          res.render("editpost", {post: vanilla});
      } 
   }); 
});
// Post Editing Logic
router.put("/:id", middleware.isAdmin ,function (req, res){
    var title = req.body.title,
              content = req.body.content,
              category = req.body.category,
              intro = req.body.intro,
              premium = Boolean;
              if (req.body.pr == "true"){premium = true} else {premium = false}
              var editedpsot = {title:title, content:content, category:category, premium:premium, intro:intro};
    Post.findByIdAndUpdate(req.params.id, editedpsot, function (err, doc){
       if (err) {res.send(err)} else {
           res.redirect("/posts/" + req.params.id);
       } 
    });
});
// Post Deleting Logic
router.delete("/:id", middleware.isAdmin , function(req, res){
   Post.findByIdAndRemove(req.params.id, function(err){
       if (err) {res.send(err)} else {
           res.redirect("/");
       }
   }) 
});
//  Exporting

module.exports = router;
