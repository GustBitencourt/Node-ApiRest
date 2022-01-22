import express from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

/* Para aplicação entender JSON*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* Configurando rotas */
app.use(statusRoute);
app.use(authorizationRoute);

app.use(jwtAuthenticationMiddleware)
app.use(usersRoute);

//Registrando erro handler
app.use(errorHandler);

//iniciando servidor
app.listen(3000, () => {
    console.log('listening on port 3000');
})