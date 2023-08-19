import Jwt from "jsonwebtoken";
import dotenv  from "dotenv";
dotenv.config();
export const auth = (req,res,next)=>{
    try {
        if (!req.headers["authorization"]) {
            res.status(401).send({
                status:false,
                msg:"authorizasion is incorrect",
                data:{}
            })
            return;
        }

        const token =  req.headers["authorization"].replace("Bearer ","")
        var checktoken = Jwt.verify(token, process.env.token_key)
        if( checktoken ){
            next();
            return
        }
        else{
            res.send({
               status:false,
               msg: "token is not valid",
               data:{}
            })
        }
    } catch (error) {
        res.status(401).send({
            status:false,
            msg:"auth somthing wrong",
            data:error
        })
        return;
    }
}