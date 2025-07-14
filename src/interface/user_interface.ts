import { Request } from "express"
import { Role } from "../../generated/prisma"
interface User_Request extends Request{
  userId?:string
  role?:Role
}

// type Role = "admin" | "user"



interface User{
  id     :     String   
  username  :  String
  email      : String   
  password    :String
  role        :Role    
  created_At  :Date 
  is_Approved :Boolean  
  task :[]
}

export {User,User_Request} 
