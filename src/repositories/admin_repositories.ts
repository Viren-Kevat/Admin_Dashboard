import prisma from "../prisma";
import { User } from "../../generated/prisma";

export const admin = async(adminId:string | undefined)=>{
    try {
        const execute = await prisma.user.findFirst({
            where:{id:adminId}
        })
        return execute
    } catch (error) {
        console.log(error);
        throw new Error("errror from admin repo admin fun");
    }
}


export const is_approved = async(userId : string)=>{
    try {
        
        const execute = await prisma.user.update({
            where:{id :userId},
            data:{
                is_Approved:true
            }
        })
        return execute

    } catch (error) {
        console.log(error);
        throw new Error("error form admin reppo");
        
        
    }
}