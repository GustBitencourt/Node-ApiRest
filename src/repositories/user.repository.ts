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

    async create(user: User): Promise<string> {
        const script = `
            INSERT INTO application_users (
                username,
                password
            )
            VALUES ($1, crypt($2, 'my_salt'))
            RETURNING uuid
        `;

        const values = [user.username, user.password];

        const { rows } = await db.query<{ uuid: string }>(script, values);
        const [newUser] = rows;
        return newUser.uuid;
    }

    async update(user: User): Promise<void> {
        const script = `
            UPDATE application_users
            SET 
                username = $1,
                password = crypt($2, 'my_salt')
            WHERE uuid = $3
        `;

        const values = [user.username, user.password, user.uuid];
        await db.query(script, values);
    }

    async removeUser(uuid: string): Promise<void> {
        const script = `
            DELETE
            FROM application_users
            WHERE uuid = $1
        `;

        const values = [uuid];

        await db.query(script, values);
    }

}

export default new UserRepository();