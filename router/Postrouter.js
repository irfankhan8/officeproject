import express from "express";

import  uploade  from  "../service/image.js"
import { UserPostcreate, postGet , upvotePost,downvotePost,postGetAllData,deletePost }  from  "../controller/PostController.js"
const   postrouter  = express.Router()

 
postrouter.route("/upload/post").post(uploade.single('post'),UserPostcreate); 
postrouter.route("/getdata").get(postGet);
postrouter.route("/upvote-Post/:_id").post(upvotePost);
postrouter.route("/downvote-Post/:_id").post(downvotePost)
postrouter.route("/postGet-AllData").get(postGetAllData);
postrouter.route("/delete-Post/:_id").delete(deletePost);


export default  postrouter;
