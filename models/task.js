var mongoose=require("mongoose");
var taskschema= new mongoose.Schema({
    title:String,
    description:String,
    assignee: 
    {
      id:
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
      },
      username:String
   },
    status:String,
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ],
     teams: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Team"
      }
   ]
});

module.exports=mongoose.model("Task",taskschema);
