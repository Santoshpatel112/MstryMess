import dbconnect from "@/lib/dbConnect";
import {success, z} from "zod";
import UserModel from "@/Model/User";
import {usernamevalidation} from "@/schemas/SignupSchema";

const UsernameQuerySchema=z.object({
    username :usernamevalidation 
})

export async function Get(request :Request){
    await dbconnect();
    try {
        // queary Parameter
        const {searchParams}=new URL(request.url)
        const quearyparam={
            username :searchParams.get('username')
        }

        //validate with zod
      const Result=UsernameQuerySchema.safeParse(quearyparam);
      console.log(Result);
      if(!Result.success){
        const usernameError=Result.error.format().
        username?._errors || []

        return Response.json({
            success:false,
            message:usernameError ?.length >0
            ? usernameError.join(', ')
            :'Invalid Query parameter',
        },{status :400})
      }
    } catch (error) {
        console.error(`Error checking Username ${error}`);
        return Response.json({
            success :false,
            message :"Errro checking username"
        },{status :500});
    }
}