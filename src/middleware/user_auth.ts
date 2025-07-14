import prisma from "../prisma";
import jwt  from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import { User_Request } from "../interface/user_interface";
import { Role } from "../../generated/prisma";

export const userAuth = async (req:User_Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.cookies.token;
        const data = jwt.verify(token,process.env.JWT_SECRET as string) as {userId:string , role:Role}
        // console.log("from user token",data);
        
        const userid = data.userId
        const role = data.role
        if (role !== "user") {
        return res.status(403).json({ success: false, message: "Only users can access this route" });
        }
        const verify_user= await prisma.user.findFirst({
            where:{id:userid}
        })

        if (!verify_user?.is_Approved) {
           return res.status(403).json({ success: false, message: "User is not approved" });
        }
        req.userId = verify_user.id;
        next();

    } catch (error) {
        console.log(error);
        throw new Error("error from the file user auth");
        
    }
}


