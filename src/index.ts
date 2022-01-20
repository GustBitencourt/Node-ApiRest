import express, { Request, Response, NextFunction } from 'express';

const app = express();

/* Configurando rotas */
app.get('/stats', (req: Request, res: Response, next:NextFunction) => {
    /* Status 200 manda o JSOn */
    res.status(200).send({foo: 'Ta ouvindo?'});
});


app.listen(3000, () => {
    console.log('listening on port 3000');
})