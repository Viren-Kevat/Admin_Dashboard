import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcryptjs"
import path from "path"
import dotenv from "dotenv"

dotenv.config({path:path.resolve(__dirname,"../../.env")})
const prisma = new PrismaClient()


async function  main() {
    const existingAdmin = await prisma.user.findFirst({
        where:{role:"admin"}
    })


    if (existingAdmin) {
        console.log("admin already exist");
        return;
    }

    const hashedPassword = await bcrypt.hash("123",10);

    await prisma.user.create({
        data:{
            username:"Admin",
            email:"admin123@gmail.com",
            password:hashedPassword,
            role:"admin",
            is_Approved:true
        }
    })
    console.log("admin seed success");
    
}

main().catch((err)=>{
    console.log(err);
    throw new Error (`error from seed.ts line 34 : ${err}`)  
}).finally(async()=>{
    await prisma.$disconnect();
})













