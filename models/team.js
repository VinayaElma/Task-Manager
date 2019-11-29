var mongoose=require("mongoose");
var teamschema= new mongoose.Schema({
    members:{
        id:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
        
    },
    member:String,
    assignment:String

    
 
});

module.exports=mongoose.model("Team",teamschema);
