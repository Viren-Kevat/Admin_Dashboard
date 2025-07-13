import { admin } from "../repositories/admin_repositories";


export const adminYes = async (adminId:string):Promise<boolean>=>{
    try {

        const isAdmin = await admin(adminId)
        return !!isAdmin
     
    } catch (error) {
        return false        
    }
}