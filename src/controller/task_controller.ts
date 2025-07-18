import { addTask,del ,update,inProgress,srch,isDone,allTask,allTaskForUser} from "../repositories/task_repositories";
import { json, Request,Response } from "express";
import { Task, User } from "../../generated/prisma";
import { AuthUserId } from "../interface/admin_interface";
import { adminYes } from "../helper/admin_checker";
import { User_Request } from "../interface/user_interface";
import { sendMail } from "./mail_controller";
import { findUser } from "../repositories/user_repositories";


export const updateTask = async (req:AuthUserId,res:Response)=>{
    try {
        const adminId = req.userId;
        const taskId = req.params.id;
        const data = req.body;
        
        if(!adminId){
            return res.status(401).json({ success: false, message: "Unauthorized: No user ID" });
        }
        const isAdmin = await adminYes(adminId)
        
        if(!isAdmin){
            return res.status(401).json({success:false,message :"sorray ur not admin "})
        }
         if (!taskId) {
            return res.status(400).json({ success: false, message: "Missing task ID in params" });
        }
        const execute = await update(data,taskId)
            return res.status(200).json({
                success:true,
                execute
            })
        }catch (error) {
        console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
        
    }
}

export const createTask = async (req:AuthUserId,res:Response)=>{
    try {
            const  id = req.userId;
            if (!id) {
                return res.status(401).json({ success: false, message: "Unauthorized: No user ID" });
            }
            const isAdmin = adminYes(id)
            if(!isAdmin){
                return res.status(401).json({success:false,message :"sorray ur not admin "})
            }
            const data:Task = req.body;
            if (!data) {
                return res.status(404).json({success:false,message:"incomplete data"})
            }
            const userData :User |null = await findUser(data.userId)
            const execute = await addTask(data)
            if (!userData) {
                return res.status(404).json({success:false,message:"incomplete data of user"})
            }
            // sending mail
            sendMail(process.env.EMAIL as string,userData?.email,data.title,data)
            res.status(200).json({success:true,data:execute})
    } catch (error) {
        console.log(error);
   return res.status(500).json({ success: false, message: "Internal Server Error" });
        
    }
}

export const  removeTask = async (req:AuthUserId,res:Response)=>{
    try {
        const adminId = req.userId;
        if (!adminId) {
            return res.status(401).json({ success: false, message: "Unauthorized: No user ID" });
        }
        const isAdmin = adminYes(adminId)
       
        if (!isAdmin) {
             return res.status(401).json({success:false,message :"sorray ur not admin "})
        }

        const {id} = req.params;
        if (!id) {
            return res.status(404).json({success:false,message:"invalid task id"})
        }
        const execute = await del(id)
        res.status(200).json({
            success:true,
            data:execute
        })
    } catch (error) {
        console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });      
        
    }
}


export const progress = async (req:User_Request,res:Response)=>{
    try {
        const {id} = req.params;
        const userId = req.userId;
      
        // console.log(userId);
        if (!userId) {
         return res.status(404).json({
                success:false,
                Message:"userid invalid"
            })
        }
        
        const taskExist = await srch(id);
        if (!taskExist) {
            return res.status(404).json({
                success:false,
                Message:"task dosnt exist"
            })
        }
        const execute = await inProgress(id,userId)
        return res.status(200).json({
            success:true,
            data:execute
        })
    } catch (error) {
        console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const done = async (req:User_Request,res:Response)=>{
    try {
        const {id} = req.params;        
        const userID  = req.userId;
         if (!userID) {
         return res.status(404).json({
                success:false,
                Message:"userid invalid"
            })
        }
        const taskExist = await srch(id);
        if (!taskExist) {
            return res.status(404).json({
                success:false,
                Message:"task dosnt exist"
            })
        }
        const execute = await isDone(id,userID)
      return res.status(200).json({
            success:true,
            data:execute
        })
    } catch (error) {
        console.log(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
        
    }
}

export const getAllTask = async(req:Request,res:Response)=>{
    try {
        const execute = await allTask();
        return res.status(200).json({
            success:true,
            data:{
                execute
            }
        })
    } catch (error) {
        console.log(error);
return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const getAllTaskForUser = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
      
        
        if (id === undefined) {
            return res.status(401).json({
                success:false,
                message:"userid is undefined"
            })
        }
        const execute = await allTaskForUser(id)

        if (!execute || execute.length===0) {
            return res.status(404).json({
                success:false,
                message:"no task fo this user"
            })
        }

        return res.status(200).json({
            success:true,
            data:{
                execute
            }
        })

    } catch (error) {
        console.log(error);
   return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}