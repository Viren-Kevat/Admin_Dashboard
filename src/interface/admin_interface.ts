import { Request } from "express"


interface AuthUserId extends Request{
    userId? :string
}

export {AuthUserId}