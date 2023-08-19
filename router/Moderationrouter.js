import express  from  "express";
import { BanUsers,UnBanUser,reportPost ,reportComment ,approvePost, approveCommit }  from  "../controller/Moderationcont.js"
const Moderationrouter  = express.Router();


 


Moderationrouter.route("/UserBann").post(BanUsers);
Moderationrouter.route("/UserunBann").post(UnBanUser);
Moderationrouter.route("/reportPost").post(reportPost)
Moderationrouter.route("/reportComment").post(reportComment)
Moderationrouter.route("/approvePost/:_id").post(approvePost);
Moderationrouter.route("/approveCommit/:_id").post( approveCommit)


export default  Moderationrouter;