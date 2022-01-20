import express, { Request, Response, NextFunction } from 'express';
import usersRoute from './routes/users.route';

const app = express();

/* Para aplicação entender JSON*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


/* Configurando rotas */
app.use(usersRoute);

app.get('/stats', (req: Request, res: Response, next:NextFunction) => {
    /* Status 200 manda o JSOn */
    res.status(200).send({foo: 'Ta ouvindo?'});
});

//iniciando servidor
app.listen(3000, () => {
    console.log('listening on port 3000');
})