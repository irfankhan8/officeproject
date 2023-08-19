import mongoose from "mongoose";

const  banUserShema = new mongoose.Schema({
  subreddit_Id:{
    type: mongoose.Schema.Types.ObjectId,ref:'Subreddit',
    required: true
  },
  reason:{
    type: String ,
    required : true
  },
    status:{
    type:String,
    banned : Boolean } 
},{timestamps: true })


const   banUser = mongoose.model('banUser',banUserShema)
export default banUser;


 
