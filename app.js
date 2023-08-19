import express from "express";
import dotenv  from "dotenv";
dotenv.config();
import connectDB  from "./db/connectmongo.js";
import router     from "./router/userrouter.js";
import postrouter from  "./router/Postrouter.js";
import commentrouter from "./router/commentrouter.js";
import subredditrouter from "./router/subredditrouter.js";
import  Moderationrouter  from "./router/Moderationrouter.js";
import invitationrouter  from  "./router/Invitationrouter.js";
const app  = express();
const Port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;




app.set("view engine","ejs")
app.use(express.json())
connectDB(DATABASE_URL);
app.use(router);
app.use(postrouter);
app.use(commentrouter);
app.use(subredditrouter);
app.use(Moderationrouter);
app.use(invitationrouter);

app.listen(Port, () => {
  console.log(`start is server in port ${Port}`);
});
