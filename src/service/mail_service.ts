import nodemailer from "nodemailer";


export const createTransport= nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        // user:process.env.EMAIL as string,
        user:"viren0210@gmail.com",
        // pass:process.env.APP_PASSWORD as string,
        pass:"uiwumhufjcmajwbj"
    }
});

