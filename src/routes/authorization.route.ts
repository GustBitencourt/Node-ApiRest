import { Router, Request, Response, NextFunction} from 'express';
import ForbiddenError from '../models/errors/forbiddenError.model';
import userRepository from '../repositories/user.repository';
import JWT from 'jsonwebtoken';

const authorizationRoute = Router();

authorizationRoute.post('/token', async (req: Request, res: Response, next:NextFunction) => {
    try {
        const authorizationHeader = req.headers['authorization'];
    
        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas');
        }

        //separando dados recebidos
        const [authenticationType, token] = authorizationHeader.split(' ');

        //validando token
        if (authenticationType !== 'Basic' || token) {
            throw new ForbiddenError('Tipo de autenticação inválido');
        }
        //decodificando o token
        const tokenContent = Buffer.from(token, 'base64').toString('utf-8')

        //extraindo usuario e senha
        const [username, password] = tokenContent.split(':');

        if(!username || !password) {
            throw new ForbiddenError('Credenciais não preenchidas');
        }

        //verificando usuario e senha
        const user = await userRepository.findByUserAndPassword(username, password);

        //'iss' é o dominio da aplicação geradora de token
        //'sub' é o assunto do token, mas é utilizado para guardar o id do usuario
        //'aud' define quem pode utilizar o token
        //'exp1 data para expiracao do token
        //'nbf' define data para qual o token não pode ser aceito antes dela
        //'iat' data de criação do token 
        //'jti' o id do token

        
    } catch (error) {
        next(error);        
    }

}) 

export default authorizationRoute;