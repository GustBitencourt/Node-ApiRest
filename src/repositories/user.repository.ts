import db from "../db";
import User from "../models/user.model";

class UserRepository {

    async findAllUsers(): Promise<User[]> {
        /* Query só deve retornar uuid e username */
        const query = `
            SELECT uuid, username
            FROM application_users 
        `;

        /* executando query com promisse */
        const result = await db.query<User>(query);

        /* pega a coluna username de result  */
        const rows = result.rows;
        return rows || [];
    }

}

export default new UserRepository();