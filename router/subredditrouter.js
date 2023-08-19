import  express  from "express";
const  subredditrouter  = express.Router();
import { subredditcreate,Getsubreddit,updateSubreddit, deleteSubreddit, SubredditAllData } from "../controller/Subredditcontroller.js"



subredditrouter.route("/subredditcreate").post(subredditcreate);
subredditrouter.route("/Getsubreddit/:_id").get(Getsubreddit);
subredditrouter.route("/updateSubreddit/:_id").put(updateSubreddit);
subredditrouter.route("/deleteSubreddit/:_id").delete(deleteSubreddit);
subredditrouter.route("/SubredditAllData").get(SubredditAllData);



export  default subredditrouter;