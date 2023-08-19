import express from "express";
import { createUser, userdata, UserUpdate,userlogout,deleteUser, loginUser,sendEmail,resetPassword  } from "../controller/usercontroller.js";
const router = express.Router();
 router.route("/create").post(createUser);
 router.route("/userdata").get(userdata);
 router.route("/Update/:_id").put(UserUpdate);
 router.route("/delete/:_id").delete(deleteUser);
 router.route("/login").post(loginUser);
 router.route("/logout-user").post(userlogout);
 router.route("/verify-Email").post(sendEmail)
 router.route("/reset-Password").post(resetPassword)

export default router;
 