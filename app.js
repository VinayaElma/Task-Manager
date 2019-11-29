var express = require('express'),
 app=express(),
 bodyparser=require("body-parser"),
 mongoose=require("mongoose"),
 passport=require("passport"),
 localstrategy=require("passport-local"),
 methodoverride=require("method-override"),
 Task=require("./models/task"),
 Comment=require("./models/comment"),
 Team=require("./models/team"),
 User=require("./models/user"),
 seedDB=require("./seed"),
 commentroutes=require("./routes/comment"),
 taskroutes=require("./routes/task"),
 teamroutes=require("./routes/team"),
 indexroutes=require("./routes/index");

 //seedDB();

mongoose.connect("mongodb://localhost/task",{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });;
 app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodoverride("_method"));

app.use(require("express-session")({
    secret:"Vinaya is cute",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentuser=req.user;
    next();
});


app.use(taskroutes);
app.use(teamroutes);
app.use(commentroutes);
app.use(indexroutes);

 app.listen(3000,function(){
    console.log("App has started");
});