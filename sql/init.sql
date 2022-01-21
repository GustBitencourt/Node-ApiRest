/* habilita o uuid generate v4 */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS application_users (
    uuid uuid DEFAULT uuid_generate_v4(), /*gera id único*/
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
)

/* inserindo admin com funcao para encripitar sneha*/
INSERT INTO application_users (username, password) VALUES ('admin', crypt('admin', 'my_salt'));
INSERT INTO application_users (username, password) VALUES ('gustavo', crypt('admin', 'my_salt'));