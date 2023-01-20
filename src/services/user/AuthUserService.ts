import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'

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
                throw new Error('Login invalid!');
            }

            const passwordMatch = await compare(password, user.password)

            if(!passwordMatch) {
                throw new Error('Login invalid!');
            }

            const token = sign({
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            });
            
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            }
            
        } catch(error: any) {
            return { message: error.message }
        }
    }
}
export { AuthUserService };