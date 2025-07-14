import prisma from "../prisma";
import { Task } from "../../generated/prisma";

export const srch = async (id:string)=>{
    const search = await prisma.task.findFirst({
        where:{id:id}
    })
    if(!search){
        return false;
    }
    return true;
}
export const update = async (data:Partial<Task>,id:string)=>{
    try {
        console.log(id);
        
        // const {title,description,eod} = data
        const updateTask : Partial<Task>= {};
        if(data.title !== undefined) {
            updateTask.title = data.title;
        }
        if (data.description !== undefined) {
            updateTask.description= data.description
        }
        if (data.eod !== undefined) {
            updateTask.eod = data.eod
        }
        const update = await prisma.task.update({
            where:{id:id},
            data:updateTask
        })
        return update
    } catch (error) {
        console.log(error);
        throw new Error("erro form the file task repo");
    }
}
export const  addTask = async (data:Task)=>{
    try {
            const add = data;
            const create = await prisma.task.create({
                data:{...add}
            })
            if (!create) {
                throw new Error("caont create the task");
            }
            return create;

    } catch (error) {
        console.log(error);
        throw new Error("error form task repo from add task");
        
        
    }
}

export const del = async (taskId:string)=>{
   try {
        const id = taskId;
        const dele = await prisma.task.delete({where:{id:id}})
        if (!dele) {
            throw new Error("cant delte this task ");
        }
        return dele
   } catch (error) {
        console.log(error);
        throw new Error("error from task repo dele");
   } 
}

export const inProgress = async(taskId :string,userId:string)=>{
    try {
        // console.log(userId);
        
        const task = await prisma.task.findUnique({
            where:{id:taskId}
        })
        if (!task ) {
            throw new Error("task doesnt exist");
        }
        if (userId !== task.userId) {
            throw new Error("this task was not assign to You");
            
        }
        const progress = await prisma.task.update({
            where:{id:taskId},
            data:{
                status:"inprogress"
            }
        })
        
        return progress;
    } catch (error) {
        console.log(error);
        throw new Error("error from task repo")
    }
}

export const isDone = async (taskId:string,userID:string)=>{
    try {
        const task = await prisma.task.findUnique({
            where:{id:taskId}
        })

        if (userID !== task?.userId){
            throw new Error("this task was not assign to you");
            
        }
        const done = await prisma.task.update({
            where:{id:taskId}, 
            data:{status:"done"}

        })
        return done;
    } catch (error) {
        console.log(error);
        throw new Error("error form the task repo done function");
        
    }
}

export const allTask = async ()=>{
    try {
        const all = await prisma.task.findMany({})
        if (!all) {
            throw new Error("no tasks exists");
            
        }
        return all;
    } catch (error) {
        console.log(error);
        throw new Error("error getting all the tasks");
        
    }
}


export const allTaskForUser = async (userid:string)=>{
    try {
        if (userid === undefined) {
            throw new Error("user id is undefined");
        }
        const allTask = await prisma.task.findMany({
            where:{userId:userid}
        })
        return allTask;

    } catch (error) {
        console.log(error);
        throw new Error("erro from the task repo get all task for user");
        
    }
}