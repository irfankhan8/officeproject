import mongoose  from  "mongoose";

const invitationSchema  = new mongoose.Schema({
  invitationlink:{
    type : String,
    required:true
  },
  code:{
    type:String,
    required : true
  },
  constructor:{
    status : String,
    required :true
  }
//   constructor(_id, status){
//     this._id = _id;
//     this.status = status;
// },
},{timestamps:true})

const  invitation = mongoose.model("invitation",invitationSchema)
export default   invitation;