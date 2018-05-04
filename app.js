// Tools
const  express = require("express"),
        app            = express(),
        bodyParser     = require("body-parser"),
        mongoose       = require("mongoose"),
        LocalStrategy  =require("passport-local"),
        methodOverride = require("method-override"),
        flash       = require("connect-flash"),
        passport       = require("passport");
// Files
    // Models
    var User = require("./models/user");
    var Post = require("./models/post");

    // Routes
    var indexRoutes    = require("./routes/index");
    var AdminRoutes    = require("./routes/admin");
    var PostRoutes    = require("./routes/posts");

// Configurations
    // Mongoose
    var db = 'mongodb://ironstone:ironstone@ds163119.mlab.com:63119/progamingtips';
    mongoose.connect(db);
    // Passport
    app.use(require("express-session")({
        secret: "Iron Stone the worst developer ever",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    // Express
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(methodOverride("_method"));
    app.use(express.static(__dirname + "/public", {lastModified: false}));
    app.use(flash());
     // Passing Variablesة 
    app.use(function(req, res, next){
      res.locals.currentUser = req.user;
      res.locals.error = req.flash("error");
      res.locals.success = req.flash("success");
      next();
    });   
// Routes
    // Main Routes
    app.get("/test", (req, res) => {
        res.render("spreed/essence");
    });
    app.use(indexRoutes);
    app.use("/posts", PostRoutes);
    app.use("/admin", AdminRoutes);
    
    // Global Route
    app.all("*", function (req, res){
       res.render("no");
    });
// Turning on server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Pro Gaming Tips is Now Online");
});