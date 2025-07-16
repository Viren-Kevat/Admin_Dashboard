import { User } from "../../generated/prisma";
import prisma from "../prisma";

export const otpVerification = async(email:string,otp:string)=>{
    try {
        const user = await prisma.user.findFirst({
            where:{email}
        })
        if (user?.otp !== otp) {
            return false
        }
        return true;
    } catch (error) {
        console.log(error);
        throw new Error("error in verification of otp");
        
    }
}