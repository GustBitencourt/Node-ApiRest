import { Pool } from "pg";

const connectionString = 'postgres://zslvtanx:7YxyvefP2QX9keObh246D_8u9YfjpSCH@kesavan.db.elephantsql.com/zslvtanx';

const db = new Pool({ connectionString });

export default db;