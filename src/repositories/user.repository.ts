import db from "../db";
import User from "../models/user.model";

class UserRepository {

    async findAllUsers(): Promise<User[]> {
        /* Query só deve retornar uuid e username */
        const query = `
            SELECT uuid, username
            FROM application_users 
        `;

        /* executando query com promisse e pegando resultado com desestruturação*/
        const { rows } = await db.query<User>(query);
        return rows || [];
    }

    async findById(uuid: string): Promise<User> {
        /* $1 é o uuid, de maneira que não permita sql injection */
        const query = `
            SELECT uuid, username
            FROM application_users 
            WHERE uuid = $1
        `;

        /* guardando uuid */
        const values = [uuid];
        const { rows } = await db.query<User>(query, values);

        /* desestruturando array */
        const [ user ] = rows;

        return user;
    }

}

export default new UserRepository();