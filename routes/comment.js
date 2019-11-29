var express= require("express");
var router=express.Router();
var Task=require("../models/task");
var Comment=require("../models/comment");

router.get("/tasks/:id/comments/new",isLoggedin,function(req,res){
    Task.findById(req.params.id,function(err,task){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("comments/new",{task:task});
        }
    });
});

router.post("/tasks/:id/comments/new",isLoggedin,function(req,res){
    Task.findById(req.params.id,function(err,task){
        if(err)
        {
            console.log(err);
        }
        else
        {
           Comment.create(req.body.comment,function(err,comment){
                if(err)
                {
                    console.log(err);
                }
                else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    task.comments.push(comment);
                    task.save();
                    res.redirect("/tasks/"+task._id);
                }
           }) ;
        }
    });
});

router.get("/tasks/:id/comments/:comment_id/edit",checkcommentownership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundcomment){
    if(err)
    {
        console.log(err);
    }
    else{
        res.render("comments/edit",{task_id:req.params.id,comment:foundcomment});
    }
    });
});

router.put("/tasks/:id/comments/:comment_id",checkcommentownership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,foundcomment){
        if(err)
        {
            res.redirect("back");
        }
        else{
            res.redirect("/tasks/"+req.params.id);
        }
    });
});

router.delete("/tasks/:id/comments/:comment_id",checkcommentownership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err)
        {
            res.redirect("back");
        }
        else{
            res.redirect("/tasks/"+ req.params.id);  
        }
    });
});

function isLoggedin(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}

function checkcommentownership(req,res,next)
{
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id,function(err,foundcomment){
            if(err)
            {
                res.redirect("back");
            }
            else
            {
                if(foundcomment.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    res.redirect("back");   
                }
            }
        });
    } 
    else
    {
        res.redirect("back");
    }
}

module.exports=router;