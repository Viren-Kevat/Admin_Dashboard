import { Request,Response } from "express";
import { admin,is_approved } from "../repositories/admin_repositories";
import { AuthUserId } from "../interface/admin_interface";

export const userApprovel = async(req:AuthUserId,res:Response)=>{
    try {
        const adminId = req.userId
        const userId = req.params.id
        const isAdmin = await admin(adminId)
        if (!isAdmin) {
            return res.status(401).json({success:false,message:"u r not admin"})
           
        }
        const updateUser = await is_approved(userId)

        if (!updateUser) {
            return res.status(401).json({
                success:false,
                message:"no such user exist"
            })
        }
        return res.status(200).json({
            success:true,
            updateUser
        })
    } catch (error) {
        console.log(error);
        throw new Error("error from admin controller user approvel");
    }
}