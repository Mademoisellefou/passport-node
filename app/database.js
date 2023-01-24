import { config } from 'dotenv';
config()
import  mysql from 'mysql';
var database = {
    host: "localhost",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWD,
    database: process.env.DATABASE_NAME
}
import { promisify } from 'util'
const pool = mysql.createPool(database)
pool.getConnection(function (err, connection) {
    if (err) throw err;
})
pool.query = promisify(pool.query)
export default pool;
