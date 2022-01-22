import { Request, Response, NextFunction} from 'express';
import ForbiddenError from '../models/errors/forbiddenError.model';
import userRepository from '../repositories/user.repository';

async function basicAuthenticationMiddleware (req: Request, res: Response, next:NextFunction) {
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

        //verificando existencia de usuário
        if(!user) {
            throw new ForbiddenError('Usuário ou senha inválidos!');
        }

        //transferindo acesso dos dados de user após criar sua interface em types
        req.user = user;
        
    } catch (error) {
        next(error);
        
    }

}

export default basicAuthenticationMiddleware;