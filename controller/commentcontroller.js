import Comment from "../model/comment.js"
import mongoose from "mongoose"
 
export const createComment = async (req, res) => {
    try {
        const create = await Comment.create(req.body)
        res.send({
            status: true,
            msg: "comment succssfully",
            data: create
        })
    }catch (error) {
        res.status(400).send({
            status: false,
            msg: 'somthing went wrong',
            data: error
        })
    }
}
export const editComment = async(req, res)=>{
    try {
        const FindById = await Comment.findById({ _id:req.body._id })
        if (FindById) {
            await Comment.findOneAndUpdate({_id:FindById._id },req.body)
            FindById.comment = req.body.comment
            res.send({
                status: true,
                msg: 'Update Successfully',
                data: FindById
            })
        } else {
            res.status(404).send({
                status: false,
                msg: 'id not found',
                data: {}
            })
        }
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: 'somthing went wrong',
            data: error
        })
    }
}

////////////deletecomand/////////////////

export const deletecomment   = async(req,res)=>{
    try{
     const   CommentId  = await   Comment.findById({_id:req.body._id})
     if(CommentId){
      const  Commentdelete = await  Comment.findOneAndDelete({_id:CommentId._id},req.body) 
      Commentdelete.comment = req.body.comment
       res.status(200).send({status:true,msg:"comment is successfully delete",data : Commentdelete});
   
  }else{
      return  res.status(404).send({status:false,msg:"user is not found",data:null})
  }
  
    }catch(err){
      console.log(err)
    }
   }






export const countsComment = async (req, res) => {
    try {
        var where = mongoose.Types.ObjectId(req.body.post)
        const countByPost = await Comment.aggregate([
            {
                $match: {
                    post_id: where,
                    is_delete: (false)
                }
            },
            {
                "$lookup": {
                    "from": "replycomments",
                    "foreignField": "commentId",
                    "localField": "_id",    
                    "as": "reply"
                }
            },
            {
                "$count": "comment"
            }
        ])
        if (countByPost) {
            res.send({
                status: true,
                msg: 'success',
                data: countByPost
            })
        } else {
            res.status(404).send({
                status: false,
                msg: 'id not found',
                data: {}
            })
        }
    } catch (error) {
        res.status(400).send({ status: false,msg: 'somthing went wrong', data: error })
    }

}


 
