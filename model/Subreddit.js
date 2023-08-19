import mongoose from "mongoose";

const  SubredditSchema   = new mongoose.Schema({
    name :   {type :String, required:true},
    email:   {type:String, required:true},
    password:{type:String,required:true,min:6,max:25},
    number  : {type:Number,required:true},
    Subreddittype:{type:String,required:true},
    // status:{type:String,banned : Boolean },
}) 




const Subreddit = mongoose.model("Subreddit",SubredditSchema);
export default Subreddit;
