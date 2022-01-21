import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../repositories/user.repository';

const usersRoute = Router();

//userRoute receber um GET executara:
//rota que busca todos os usuarios
usersRoute.get('/users', async (req: Request, res: Response, next:NextFunction) => {
    //pegando do banco
    const users = await userRepository.findAllUsers();
    //mandando a resposta
    res.status(StatusCodes.OK).json(users)
})

//rota busca usuario especifico
usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string}>, res: Response, next:NextFunction) => {
    //responsavel por guardar o id que será usado para acessar o user
    const uuid = req.params.uuid;
    //pegando do banco
    const user = await userRepository.findById(uuid);    

    res.status(StatusCodes.OK).send(user);
})


//userRoute receber um POST executara:
//cria usuario
usersRoute.post('/users', (req: Request, res: Response, next:NextFunction) => {
    const newUser = req.body;

    res.status(StatusCodes.CREATED).send(newUser);
})

//userRoute receber um PUT executara:
//atualiza usuario especifico
usersRoute.put('/users/:uuid', (req: Request<{ uuid: string}>, res: Response, next:NextFunction) => {
    //responsavel por guardar o id que será usado para acessar o user
    const uuid = req.params.uuid;

    //pegando o usuario id para devolver como resposta
    const modifiedUser = req.body;    

    res.status(StatusCodes.OK).send(modifiedUser);    
})

//userRoute receber um DELETE executara:
//excluir usuario especifico
usersRoute.delete('/users/:uuid', (req: Request<{ uuid: string}>, res: Response, next:NextFunction) => {
    res.sendStatus(StatusCodes.OK);
})


export default usersRoute;