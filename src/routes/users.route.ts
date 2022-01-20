import { Router, Request, Response, NextFunction } from 'express';

const usersRoute = Router();

//userRoute receber um get executara:

//rota users
usersRoute.get('/users', (req: Request, res: Response, next:NextFunction) => {
    const users = [{ userName: 'Gustavo' }];
    //mandando a resposta
    res.status(200).json(users)
})

//rota pelo id de users
usersRoute.get('/users/:uuid', (req: Request<{ uuid: string}>, res: Response, next:NextFunction) => {
    //responsavel por guardar o id que será usado para acessar o user
    const uuid = req.params.uuid;

    

    res.status(200).send({ uuid });
})

export default usersRoute;