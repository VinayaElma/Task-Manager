var express= require("express");
var router=express.Router();
var Task=require("../models/task");
var Team=require("../models/team");
var User=require("../models/user");
router.get("/tasks/:id/teams/new",isLoggedin,function(req,res){
    Task.findById(req.params.id,function(err,task){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("teams/new",{task:task});
        }
    });
});


router.post("/tasks/:id/teams/new",isLoggedin,checkteamownership,function(req,res){
    Task.findById(req.params.id,function(err,task){
        if(err)
        {
            console.log(err);
        }
        else
        {
            User.findOne({username:req.body.team.member},function(err,user){
                if(err)
                {
                    console.log(err);
                    
                    
                }
                else
                {
                    if(user===null)
                    {
                        res.redirect("/tasks/"+req.params.id)
                    }
                    else
                    {
                        Team.create(req.body.team,function(err,team){
                            if(err)
                            {
                                console.log(err);
                            }
                            else{
                            team.members.id=user.id;
                            team.save();
                            task.teams.push(team);
                            task.save();
                            res.redirect("/tasks/"+task._id);
                            }
                        }) ;
                    }
                    
                }
             });
                    
                    
                        
                  
                
        }
    });
});

router.get("/tasks/:id/teams/:team_id/edit",checkteamownership,function(req,res){
    Team.findById(req.params.team_id,function(err,foundteam){
    if(err)
    {
        console.log(err);
    }
    else{
        res.render("teams/edit",{task_id:req.params.id,team:foundteam});
    }
    });
});

router.put("/tasks/:id/teams/:team_id",checkteamownership,function(req,res){
    Team.findByIdAndUpdate(req.params.team_id,req.body.team,function(err,foundteam){
        if(err)
        {
            res.redirect("back");
        }
        else{
            res.redirect("/tasks/"+req.params.id);
        }
    });
});

router.delete("/tasks/:id/teams/:team_id",checkteamownership,function(req,res){
    Team.findByIdAndRemove(req.params.team_id,function(err,foundteam){
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

function checkteamownership(req,res,next)
{
    if(req.isAuthenticated())
    {
        Task.findById(req.params.id,function(err,foundtask){
            if(err)
            {
                res.redirect("back");
            }
            else
            {
                if(foundtask.assignee.id.equals(req.user._id))
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