var User = require("../models/user");
var Post = require("../models/post");

// all the middleare goes here
var authObj = {};

authObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

authObj.isAdmin = function(req, res, next){
    if(req.isAuthenticated() && req.user.admin == true){
        return next();
    }
    req.flash("error", "You need to be Admin to do that");
    res.redirect("/");
}

authObj.isPremium = function(req, res, next){
    if(req.isAuthenticated() && req.user.premium == true){
        return true;
    }
}

module.exports = authObj;

