import express from 'express';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

/* Para aplicação entender JSON*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* Configurando rotas */
app.use(usersRoute);
app.use(statusRoute);

//iniciando servidor
app.listen(3000, () => {
    console.log('listening on port 3000');
})