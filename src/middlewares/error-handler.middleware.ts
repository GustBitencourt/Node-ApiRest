import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ForbiddenError from '../models/errors/forbiddenError.model';
import DatabaseError from './../models/errors/databaseError.model';
/*  Intercepta as Requisições */

function errorHandler(error: any, req: Request, res: Response, next:NextFunction) {
    if (error instanceof DatabaseError) {
        res.sendStatus(StatusCodes.BAD_REQUEST);

    } else if (error instanceof ForbiddenError) {
        res.sendStatus(StatusCodes.FORBIDDEN);


    } else {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }

}

export default errorHandler;