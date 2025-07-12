import jwt from "jsonwebtoken"
import { Request,Response,NextFunction } from "express"
import { AuthUserId } from "../interface/admin_interface";



export const protect =(req:AuthUserId,res:Response,next:NextFunction):void=>{
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({success:false,message:"unauthorised abs.. of token"})
        }

        try {
            const data =  jwt.verify(token ,process.env.JWT_SECRET as string) as {userId : string}
            req.userId = data.userId;
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