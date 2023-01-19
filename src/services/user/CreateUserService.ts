import { response } from 'express';
import prismaClient from '../../prisma'

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        try {
            //verifcar se ele enviou um email
            if(!email){
                throw 'Email incorrect';
            }

            const userAlreadyExists = await prismaClient.user.findFirst({
                where: {
                    email: email
                }
            })

            if(userAlreadyExists){
                throw 'User already exists';
            }

            const user = await prismaClient.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password,
                },
                select:{
                    id: true,
                    name: true,
                    email: true,
                }
            })

            return user;

        } catch(error) {
            return { message: error}
        }
        

    }
}

export { CreateUserService };