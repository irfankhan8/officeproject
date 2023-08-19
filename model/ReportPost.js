import mongoose from "mongoose";
const  ReportPostUserSchema = new mongoose.Schema({
    User_id: {
        type :mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required :true
      },
      reportreson:{
        type :String,
        required:true
        },
    post_id: {
        type :mongoose.Schema.Types.ObjectId,
        ref : 'PostUser',
        required :true
      },
    isReported : {type :Boolean,default: false},
    isApproved : {type :Boolean,default: false},
  
},{timestamps: true })



const   ReportPost = mongoose.model('ReportPost',ReportPostUserSchema)
export default ReportPost;