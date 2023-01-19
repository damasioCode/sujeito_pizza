import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService{
    async execute({ email, password }: AuthRequest){
        try {
            const user = await prismaClient.user.findFirst({
                where:{
                    email: email
                }
            })
    
            if(!user){
                throw 'Login invalid!'
            }

            const passwordMatch = await compare(password, user.password)

            if(!passwordMatch) {
                throw 'Login invalid!'
            }
            
            return { ok: true }
            
        } catch(error) {
            return { message: error}
        }
    }
}
export { AuthUserService };