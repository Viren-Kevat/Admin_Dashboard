import jwt from "jsonwebtoken"
import { Role } from "../../generated/prisma"

export const generateToken = (userId:string,role:Role):string=>{

    let day = parseInt(process.env.JWT_EXPIRE || "7")

    return jwt.sign({userId:userId,role},process.env.JWT_SECRET as string,{expiresIn:`${day}d`})

}