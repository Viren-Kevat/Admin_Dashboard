import jwt from "jsonwebtoken"
import { Request,Response,NextFunction } from "express"
import { AuthUserId } from "../interface/admin_interface";
import { Role } from "../../generated/prisma";



export const protect =(req:AuthUserId,res:Response,next:NextFunction):void=>{
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({success:false,message:"unauthorised abs.. of token"})
        }

        try {
            const data =  jwt.verify(token ,process.env.JWT_SECRET as string) as {userId : string ,role:Role}
            // console.log("for admin",data);
            
            req.userId = data.userId;
            req.role = data.role;
            next();
        } catch (error) {
            console.log(error);            
            throw new Error("error from jwt verify");
        }
    } catch (error) {
        console.log(error);
        throw new Error("error form middlerware ");
        
    }
}