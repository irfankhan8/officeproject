import express  from "express";
import { invitationcreate, acceptInvitation ,InvitationAllData, cancelInvitation }  from  "../controller/Invitationcont.js"
const invitationrouter = new express.Router();

 
 

invitationrouter.route("/invitation").post(invitationcreate)
invitationrouter.route("/acceptInvitation/:_id").post(acceptInvitation)
invitationrouter.route("/InvitationAllData").get(InvitationAllData)
invitationrouter.route("/cancelInvitation/:_id").post(cancelInvitation)

 
export default invitationrouter;