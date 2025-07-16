import { Task } from "../../generated/prisma";
import { createTransport } from "../service/mail_service";

const transport = createTransport;

export const sendEmailForPassword = async(from:string,to:string,subject:string,msg:string)=>{
    try {
        transport.sendMail({
            from:from,
            to:to,
            subject:subject,
            text:msg
        })
        console.log(`mail is sent successfully for password`);
    } catch (error) {
         console.log("error:",error);
         
    }
}
export const sendMail = async(from:string,to:string ,subject:string, msg:Task )=>{
    try{transport.sendMail({
        from:from,
        to:to,
        subject:subject,
        text:`
                Title: ${msg.title},
                Description:${msg.description},
                EOD:${msg.eod}
        `
    })
    console.log(`mail is sent successfully`);
    }catch(error){
        console.log("error:",error);
        
    }
}