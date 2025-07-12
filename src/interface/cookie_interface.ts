interface CookieOption{
    expires:Date |string |number,
    httpOnly:boolean
}


interface MyResponse{
 status:(code:number)=>MyResponse,
 cookie:(name:string,token:string,optinon:CookieOption)=>MyResponse

}

export {CookieOption,MyResponse}