import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';

interface Payload{
    sub: string;
}

export interface UserRequest extends Request {
    user_id: string;
}

const isAutenticated = ( 
    request: UserRequest, 
    response: Response, 
    next: NextFunction 
) => {
    try {
        const authToken = request.headers.authorization;

        if(!authToken){
            throw new Error('Not authorized');
        }

        const [, token] = authToken.split(' ');
    
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        request.user_id = sub;

        return next();

    } catch(error) {
        return response.json({ message: error.message });
    }
}

export default isAutenticated 