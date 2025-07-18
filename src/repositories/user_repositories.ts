import prisma from "../prisma";
import { User } from "../../generated/prisma";


export const findUser  = async (userId:string)=>{
    try {
        const user = await prisma.user.findFirst({
            where:{id:userId}
        })
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("erro from the user repo");
        
    }
}
export const passChange = async (email:string,newPass:string)=>{
    try {
        const pass = await prisma.user.update({
            where:{email:email},
            data:{
                password:newPass
            }
        })
        return pass;
    } catch (error) {
        console.log(error);
        throw new Error("error from the passCHange")
    }
}
export const sign = async(data:User)=>{
    try {
        let email = data.email;

        const existUser = await prisma.user.findFirst({
            where:{email}
        })
        if (existUser){
            return ("user already exists")
        }
    
        const create = await prisma.user.create({
            data:{
                ...data
            }
        })
        if(!create){
            throw new Error (`user is not created `)
        }

        return create

    } catch (error) {
        console.log(error);
        throw new Error(`from user repo line 9 :${error}`);
    }
}
export const login = async(data:User)=>{
    try {
        const {email} = data ;
        const login = await prisma.user.findFirst({
        where:{email}
    })
        if(!login){
                return("user didnt exist")
            }
    return login;
    } catch (error) {
        console.log(error);
        throw new Error(`err from user repo line 42 :${error}`);
        
    }
}