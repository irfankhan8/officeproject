import mongoose from "mongoose";

const  ReportCommitUserSchema = new mongoose.Schema({
    // subreddit_Id:{
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Subreddit",
    //     required :true
    // },
    // post_id: {
    //     type :mongoose.Schema.Types.ObjectId,
    //     ref : "PostUser",
    //     required :true
    //   },
    //     User_id: {
    //         type :mongoose.Schema.Types.ObjectId,
    //         ref : "Users",
    //         required :true
    //       },
//
reportreson:{
    type :String,
    required:true
    },
    report:{
    type : String,
    require : true
    },
    isReported : {type :Boolean,default: false},
    isApproved : {type :Boolean,default: false},
  
},{timestamps: true })


const   ReportCommit = mongoose.model('ReportCommit',ReportCommitUserSchema)
export default  ReportCommit;