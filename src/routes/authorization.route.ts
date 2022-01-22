import { StatusCodes } from 'http-status-codes';
import { Router, Request, Response, NextFunction} from 'express';
import ForbiddenError from '../models/errors/forbiddenError.model';
import userRepository from '../repositories/user.repository';
import JWT from 'jsonwebtoken';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware , async (req: Request, res: Response, next:NextFunction) => {
    try {
        //pegando o user de basicAuthenticationMiddleware
        const user = req.user;

        if(!user) {
            throw new ForbiddenError('Usuário não informado!');
        }

        //'iss' é o dominio da aplicação geradora de token
        //'sub' é o assunto do token, mas é utilizado para guardar o id do usuario
        //'aud' define quem pode utilizar o token
        //'exp1 data para expiracao do token
        //'nbf' define data para qual o token não pode ser aceito antes dela
        //'iat' data de criação do token 
        //'jti' o id do token

        //variaveis JWT
        const jwtPayload = { username: user.username };
        const jwtOptions = { subject: user?.uuid };
        const secretKey = 'my_secret_key';

        //criação JWT
        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);
        res.status(StatusCodes.OK).json({ token: jwt });

        
    } catch (error) {
        next(error);        
    }

}) 

export default authorizationRoute;