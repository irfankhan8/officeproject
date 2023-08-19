import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import  nodemailer  from  "nodemailer"
import Users from "../model/userdata.js";
import dotenv  from "dotenv";
dotenv.config();

////////createUser ///////
export const createUser = async (req, res,next) => {
  try {
      const userchecke = await Users.findOne({
          $or: [
              { email: req.body.email },
              { number: req.body.number }]
      });
      if (userchecke) {
          return res.status(208).send({ status: false, msg: "User is Already exises", data: null })
      }
      req.body.password =  await  bcrypt.hash(req.body.password,10)
      const usercreate  =  await  Users.create(req.body);
      usercreate.token  =  await Jwt.sign({ type: Date.now(), userId: usercreate._id },process.env.token_key)
      return res.status(201).send({ status: true, msg: "User is Successfully Create", data:usercreate});
      
  } catch (err) {
      console.log(err)
  }
}


////////getUser//////

export const userdata = async (req, res,next) => {
  try {
    const usercheck = Users.findOne({
      $or: [{ email: req.body.email }, { number: req.body.number }],
    });
    if (!usercheck) {
      res.status(404).send({ status: false, msg: "User is not found!" });
    }
    const UserData = await Users.find();
    res.status(200).send({ status: true, msg: "All UserData", data: UserData });
  } catch (err) {
    console.log(err);
  }
};
//////updateUser///// 

export const UserUpdate = async (req, res,next) => {
  const UserId = await  Users.findById(req.params._id);
  // console.log(UserId._id)
  if (!UserId) {
      return res.status(404).send({ status: false, msg: "User is not found!", data: null })
  }
   req.body.password = await bcrypt.hash(req.body.password, 10);
   const userupdate = await Users.findByIdAndUpdate(UserId,req.body);
       // console.log(userupdate)
 userupdate.token  = await Jwt.sign({ type: Date.now(), UserId:userupdate._id },process.env.token_key);
  res.status(200).send({ status: true, mgs: "user update succefully...", data: userupdate });
}


////////////deleteUser /////////////////////
export  const  deleteUser  = async (req,res)=>{
  try{
     const UserId   = await  Users.findById(req.params._id);
     if(!UserId){
         return  res.status(404).send({status:false,msg : "User Not found!"})
     }
      const  deletedUser = await  Users.findByIdAndDelete(UserId)
      if(!deletedUser){
        return res.status(400).send({status:false,msg :"Not delete User..Bad request?"})
      }
      res.status(200).send({status:true,msg:"User delete Successfully...!",data:deletedUser})
  }catch(err){
     console.log(err)  
  }
 }


 
 ////////loginUser//////////////////
export const loginUser = async (req, res,next) => {
  try {
    const usercheck = await Users.findOne({
      $or: [
        { email: req.body.email },
        { number: req.body.number }
      ]
    });

    if (!usercheck) {
      return res.status(400).send({ status: false, msg: "Invalid login details", data: null });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, usercheck.password);
    
    if (!passwordMatch) {
      return res.status(401).send({ status: false, msg: "Password doesn't match. Please try again", data: null });
    }
    const token = Jwt.sign( { time: new Date(), UserId: usercheck._id },process.env.token_key,{ expiresIn: "3h" }
    );
    return res.status(200).send({ status: true, msg: "Login successfully", data: { user: usercheck, token: token } });
  } catch (error) {
    return res.status(500).send({ status: false, msg: "An  Internal Server Error", data: null });
  }
};

///////////////////////userlogout////////////////////////////////////

 export const userlogout = async (req, res,next) => {
  try {
    const token = req.headers.token
    console.log("token : ", token )
    const verifyToken = await Jwt.verify(token,process.env.token_key);
    console.log(verifyToken);
    if (!verifyToken) {
      return res.status(401).send({status:false,msg:'invalid token!',data:null})
    }
    res.send({status:true,msg:'logout success'})
  } catch (err) {
    console.log(err)
  }
}



 ///////verifyEmail//// 
///////email send ethereal se 

export const sendEmail  = async(req,res)=>{   

  let transporter = await nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user:  process.env.email_user,
        pass:  process.env.email_password 
    }
  });

  let  info = await transporter.sendMail({
      from: 'No Name <Noname@gmail.com>',
      to: 'kuchbhi@email.com',
      subject: 'hello ',
      text: 'Hello to myself! No Name',
      html: '<p><b>Hello how are you</b></p>'
  });

 res.send(info)

}


/////////////////////resetPassword///////////////
export const resetPassword = async (req, res) => {
  try {
    const checkUser = await Users.findOne({ number: req.body.number });
    if (checkUser) {
      const old_Password = await bcrypt.compare(req.body.old_pass, checkUser.password);
      if (old_Password) {
        const newPasswordHash = await bcrypt.hash(req.body.new_pass, 10);
    const newcreate =  await Users.findByIdAndUpdate(checkUser._id, { password: newPasswordHash });
        res.status(200).json({
          status: true, 
          msg: "Password reset successful",
          data:  newcreate
        });
      } else {
        res.status(400).json({
          status: false,
          msg: "Old password is incorrect. Please enter the correct old password.",
          data: {}
        });
      }
    }else {
      res.status(404).json({
        status: false,
        msg: "User with the provided number not found.",
        data: {}
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      msg: "Something went wrong with the server.",
    });
  }
};


 