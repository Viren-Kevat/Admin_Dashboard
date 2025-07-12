type Role = "admin" | "user"



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

export {User} 
