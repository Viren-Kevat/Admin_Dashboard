import { generateToken } from "../helper/generate_token";
import { Role, User } from "../../generated/prisma";
import { Response } from "express";
import { CookieOption,MyResponse } from "../interface/cookie_interface";


export const setCookie = (user:User,res:MyResponse):string=>{
    let day = parseInt(process.env.JWT_EXPIRE || "7");
    const token = generateToken(user.id,user.role);
    const options :CookieOption= {
        expires: new Date(Date.now()+ day *24*60*60*1000),
        httpOnly:true
    }
    user.password="";
    res.cookie("token",token,options);
    return token;
};