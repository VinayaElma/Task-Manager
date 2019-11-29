var express= require("express");
var router=express.Router();
var Task=require("../models/task");
var Team=require("../models/team");
router.get("/tasks",isLoggedin,function(req,res){
    Task.find({}).populate("teams").exec(function(err,tasks){
       if(err)
       {
           console.log(err);
       }
       else
       {
      
           res.render("tasks/index",{tasks:tasks,currentuser:req.user});
       }
    });
    
    });
    
router.post("/tasks",isLoggedin,function(req,res){
   var title=req.body.title;
   var description=req.body.description;
   var assignee={id:req.user._id,username:req.user.username};
   var status=req.body.status;
   var newtask={title:title,description:description,assignee:assignee,status:status};

   Task.create(
       newtask,
       function(err,task)
       {
           if(err)
           {
               console.log(err);
           }
           else
           {
                
               res.redirect("/tasks");
           }
       }
   );
   
   });
   
router.get("/tasks/new",isLoggedin, function(req,res){
       res.render("tasks/new");
        });
   
   
router.get("/tasks/:id",isLoggedin,function(req,res){
    Task.findById(req.params.id).populate("comments").populate("teams").exec(function(err,foundtask){
       if(err)
       {
           console.log(err);
       }
       else
       {
           res.render("tasks/show",{task:foundtask});
       }
       }); 
   
   });
   

router.get("/tasks/:id/edit",checktaskownership,function(req,res){
    Task.findById(req.params.id,function(err,foundtask){
    if(err)
    {
        console.log(err);
    }
    else{
        res.render("tasks/edit",{task:foundtask});
    }
    });
});

router.put("/tasks/:id",checktaskownership,function(req,res){
    Task.findByIdAndUpdate(req.params.id,req.body.task,function(err,foundtask){
        if(err)
        {
            res.redirect("/tasks");
        }
        else{
            res.redirect("/tasks/"+req.params.id);
        }
    });
});


router.delete("/tasks/:id",checktaskownership,function(req,res){
    Task.findByIdAndRemove(req.params.id,function(err,foundtask){
        if(err)
        {
        res.redirect("/tasks");
        }
        else{
            res.redirect("/tasks");  
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

function checktaskownership(req,res,next)
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