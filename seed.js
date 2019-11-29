var mongoose=require("mongoose");
var Task= require("./models/task");
var Comment=require("./models/comment");
var Team=require("./models/team");

var data=[
    {
        title:"TASK1",
        description:"1st task",
        assignee:"Vinaya",
        status:"Not yet started"
    },
    {
        title:"TASK2",
        description:"2nd task",
        assignee:"Ammu",
        status:"Not yet started"
    },
    {
        title:"TASK3",
        description:"3rd task",
        assignee:"Vineetha",
        status:"Not yet started"
    }
];

function seedDB(){
    Task.deleteMany({},function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("removed tasks");
            //data.forEach(function(seed){
              //  Task.create(seed,function(err,task){
                //if(err)
                //{
                  //  console.log(err);
                //}
                //else{
                    //console.log("added task");
                    //Comment.create(
                        //{
                            //text:"Nice",
                            //author:"Ponnu"
                        //},function(err,comment){
                            //if(err)
                            //{
                                //console.log(err);
                            //}
                            //else{
                                //task.comments.push(comment);
                                //console.log("Created comment");
                            //}
    
                        //});
                        //Team.create(
                            //{
                                //member:"Achu",
                                //assignment:"web developer"
                            //},function(err,comment){
                                //if(err)
                                //{
                                    //console.log(err);
                                //}
                                //else{
                                    //task.teams.push(comment);
                                    //task.save();
                                    //console.log("Created team");
                                //}
        
                            //});
                //}
            //});

                
            //});
        }
    });    
}
module.exports=seedDB;