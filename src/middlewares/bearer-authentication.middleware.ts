import { Request, Response, NextFunction} from 'express';
import ForbiddenError from '../models/errors/forbiddenError.model';
import JWT from 'jsonwebtoken';
import userRepository from '../repositories/user.repository';

async function bearerAuthenticationMiddleware(req: Request, res: Response, next:NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas!')
        }

        //separando dados recebidos
        const [authenticationType, token] = authorizationHeader.split(' ');

        //validando token
        if (authenticationType !== 'Bearer' || token) {
            throw new ForbiddenError('Tipo de autenticação inválido');
        }

        //verificando token e private key
        const tokenPayLoad = JWT.verify(token, 'my_secret_key');
        
        if(typeof tokenPayLoad !== 'object' || !tokenPayLoad.sub) {
            throw new ForbiddenError('Token Inválido');
        }
        
        //pegando uuid no token
        const uuid = tokenPayLoad.sub;
        const user = await userRepository.findById(uuid);

        req.user = user;
        next();
        
    } catch (error) {
        next(error);        
    }

}

export default bearerAuthenticationMiddleware;