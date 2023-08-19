import mongoose from "mongoose";

const PostUserSchema   = new mongoose.Schema({
    PostId:{type:mongoose.Schema.ObjectId,ref:"Users"},
    post :{type:String,required:true},
    title:{type:String,required:true},
    description :{type:String,required:true},
    upvote  :{type:Number,required:false},
    downvote: {type:Number,required:false},
  
},{timestamps:true})



const PostUser  = mongoose.model("PostUser",PostUserSchema);

export default PostUser;