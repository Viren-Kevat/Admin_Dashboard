import { Request } from "express"
import { Role } from "../../generated/prisma"


interface AuthUserId extends Request{
    userId? :string
    role?:Role
}

export {AuthUserId}