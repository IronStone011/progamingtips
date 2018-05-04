// Tools
const express = require("express"),
      router  = express.Router(),
      passport = require("passport");

// Models
var User = require("../models/user");
var Post = require("../models/post");
// middleware
var middleware = require("../middleware/auth");
// Routes
router.get("/", function(req, res){
   res.render("landing");
});

// Log in Routes
    // Form
router.get("/login", function(req,res){
    if(req.isAuthenticated()) {res.send("You are already logged in")} else {
    res.render("login") ;
    }
});
    // Logic
router.post("/login", passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
    // console.log(req.user);
    res.redirect("/");
  });
// Register Route
    // Form
router.get("/register", function(req,res){
     res.render("register");
});
    // Logic
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            // req.flash("error", err.message);
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
        //   req.flash("success", "Welcome to Brand " + user.username);
           res.redirect("/"); 
        });
    });
});
// Log Out Route
router.get("/logout",middleware.isLoggedIn ,function(req, res){
  req.logout();
  res.redirect("/")
});
// Premium
router.get("/premium", (req, res) =>{
   Post.find({}, function(err, allPosts){
       if(err){
           console.log(err);
       } else {
          res.render("premium",{posts:allPosts});
        // res.send(allPosts);
       }
    });
});
// Contact page
router.get("/contact", function(req,res){
     res.render("about");
});


//  Exporting

module.exports = router;
