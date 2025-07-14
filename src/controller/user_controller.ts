import { sign,login } from "../repositories/user_repositories";
import { Response,Request } from "express";
import { setCookie } from "../cookie/set_cookie";
import bcrypt from "bcryptjs"

export const signupUser = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const data = req.body;
        if (!data.email || !data.username || !data.password) {
            return res.status(400).json({success:false,message:"incomplete data"})
        }
        // hashing password
        data.password = await bcrypt.hash(data.password,10);
        const execute = await sign(data)

        if (typeof execute === "string") {
            return res.status(409).json({ success: false, message: execute });
        }
        const token = setCookie(execute,res)

        const {id,password,...userWithoutPassword} = execute;
        return res.status(200).json({
            success:true,
            userWithoutPassword,
            token
        })
    } catch (error) {
        console.log(error);
        throw new Error("error from user controller line 8");
    }
}


export const loginUser = async (req:Request,res:Response):Promise<Response>=>{
    try {
        const data = req.body;
        const user = await login(data);

        if(typeof user === "string"){
            return res.status(409).json({success:false,message:user})
        }

        if (!user.is_Approved) {
           return res.status(401).send("user is not approved")
        }
        const match = await bcrypt.compare(data.password,user.password)
        if (!match) {
            return res.status(401).json({success:false,message:"invalide password"})
        }
        const token = setCookie(user,res)
        console.log(token);
        
            // ✅ Remove password field safely
    const { password, ...userWithoutPassword } =  user;
        return res.status(200).json({
            success:true,
            userWithoutPassword,
        })

    } catch (error) {
        console.log(error);
        throw new Error("error from user conteroller lne 33");
        
    }
}