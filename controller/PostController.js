 import  PostUser  from  "../model/PostUser.js"

export const UserPostcreate = async(req,res)=>{
    req.body.post   = req.file.path
    const postcreate  = PostUser.create(req.body);
    if(postcreate){
        res.status(200).send({status:true,msg :"User Post Uploading",data: postcreate})
    }else{
        return  res.status(400).send({status:false,msg:"User Post Not Upload",data:null})
     }
} 


export const postGet = async (req, res) => {
    try {
        const getAllPost = await PostUser.find({}).sort({ _id: -1 })
        if (getAllPost == 0) {
            return res.status(404).send({ status: false, msg: 'Data Not Found!', data: null })
        }
        res.send({ status: true, msg: "PostAllData", data: getAllPost })
    } catch (error) {
        res.status(400).send({ status: false, msg: 'Something Went wrong!', data: error })
    }
}

export const upvotePost = async (req,res) => {
    try {
        const postId = req.params._id;
        const post = await PostUser.findById(postId);
        if (!post) {
            return res.status(404).json({status :false,msg:"UserPost is not found!",data:null});
        }
        
         post.upvote = post.upvote ? post.upvote + 1 : 1
        // console.log(post.upvote)
        const updatedPost = await post.save();
        res.status(200).send({ status: true, message: 'Post upvoted successfully', post: updatedPost });
    } catch (error) {
        console.log(error)
        res.status(400).send({ status: false, msg: 'something went wrong!', data: error })
    }
}

 

export  const downvotePost  = async(req,res)=>{
    try{   
        const postId = req.params._id;

        const post = await PostUser.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.downvote = post.downvote ? post.downvote + 1 : 1;
        const downdatedPost = await post.save();
        res.status(200).send({ status: true, message: 'Post dowvoted successfully', post:downdatedPost });
 }catch(err){
  console.log(err)
  return  res.status(404).send({status :false,msg : "something went wrong!",data:null})
 }     

}



export const postGetAllData = async (req, res) => {
    try {
        const postsWithUserAndComments = await PostUser.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            }

        ]);

        res.status(200).send(postsWithUserAndComments);
    } catch (error) {
        res.status(400).send({ status: false, msg: 'something went wrong!', data: error })
    }
}
 
////////////////deletePost: Delete a post.//////////////

 export const deletePost   = async(req,res)=>{
  try{

   const  postId  = await  PostUser.findById({_id:req.body._id})
   if(postId){
    const  postdelete = await PostUser.findOneAndDelete({_id:postId._id},req.body) 
    // console.log(postdelete)
     res.status(200).send({status:true,msg:"post is successfully delete",data :postdelete});
 
}else{
    return  res.status(404).send({status:false,msg:"user is not found",data:null})
}

  }catch(err){
    console.log(err)
  }
 }
 
 