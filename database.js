import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "only_music",
    idleTimeoutMillis: 5000,
});

export default pool;