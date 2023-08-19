import express from "express";
import { createComment,editComment,countsComment, deletecomment } from "../controller/commentcontroller.js"
 const commentrouter  =  express.Router()



 
commentrouter.route("/create-Comment").post(createComment)
commentrouter.route("/edit-Comment").post(editComment);
commentrouter.route("/counts-Comment").get(countsComment);
commentrouter.route("/delete-comment").delete(deletecomment)
 

export default commentrouter;