import jwt from "jsonwebtoken"

export const generateToken = (userId:string):string=>{

    let day = parseInt(process.env.JWT_EXPIRE || "7")

    return jwt.sign({userId:userId},process.env.JWT_SECRET as string,{expiresIn:`${day}d`})

}