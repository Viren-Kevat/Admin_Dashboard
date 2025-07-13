import prisma from "../prisma";
import { Task } from "../../generated/prisma";


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