import { sign,login } from "../repositories/user_repositories";
import { Response,Request } from "express";
import { setCookie } from "../cookie/set_cookie";
import { changePassService } from "../service/forget_Password_service";
import bcrypt from "bcryptjs"
import  {sendEmailForPassword} from "./mail_controller";
import prisma from "../prisma";
import { otpVerification } from "../service/otp_verify_service";


export const sendLinkForPassword = async(req:Request,res:Response)=>{
    try {
        const email = req.body.email;
        if (!email ) {
            res.status(401).json({success:false,message:"enter the email pleas"})
        }
        const userData = await prisma.user.findUnique({
            where:{email:email}
        })
        if (!userData) {
            return res.status(404).json({
                success:false ,
                message:"User doesnot exist"
            })
        }
        // generate the otp 
        const otp = Math.floor(Math.random()*900000).toString();
        // add otp in user schema
        await prisma.user.update({
            where:{email:email},
            data:{
                otp:otp,
            }
        })
        // console.log(email);
        await sendEmailForPassword(
            process.env.EMAIL as string,
            email,
            "Password reset link",
            `http://localhost:5173/enter-password?mail=${email}\n\nYour OTP is: ${otp}\n`
        );

        return res.status(200).json({
            success: true,
            message: "Mail sent successfully for reset password link",
        });
    } catch (error) {
        console.log(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
        
    }
}
export const updatePassword = async(req:Request,res:Response)=>{
    try {
        const {email,password,otp} = req.body;
        const verification = await otpVerification(email,otp);
        if (!verification) {
           return res.status(401).json({success:false,message:"enter valid otp"})
        }
        const execute =await changePassService(email,password);
        if (!execute) {
           return res.status(401).json({success:false,msg:"error with changing the password"})
        }
        // reseting the otp once success
        await prisma.user.update({
            where: { email },
            data: {
                otp: null,
            },
        });
         return res.status(200).json({
            success:true,
            data:execute,
            message:"password change was a success"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
        
    }
}
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
      return res.status(500).json({ success: false, message: "Internal Server Error" });
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
        // console.log(token);
        
            // ✅ Remove password field safely
    const { password, ...userWithoutPassword } =  user;
        return res.status(200).json({
            success:true,
            userWithoutPassword,
        })

    } catch (error) {
        console.log(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
        
    }
}