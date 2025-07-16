import { passChange } from "../repositories/user_repositories";
import bcrypt from "bcryptjs"

export const changePassService = async (email:string,pass:string)=>{
    try {
        const newPass = await bcrypt.hash(pass,10);
        const done = await passChange(email,newPass);
        if (!done) {
            throw new Error("error from password service");
        }     
        return done;   
    } catch (error) {
        console.log(error);
        throw new Error("errro from service change password")
    }
}