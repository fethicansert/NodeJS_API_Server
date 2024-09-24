import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();


// Create the connection to database
const createMySqlConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_DB_HOST,
            user: process.env.MYSQL_DB_USER,
            password: process.env.MYSQL_DB_USER_PASSWORD,
            database: process.env.MYSQL_DB_DATABASE,
        });
        if (connection) {
            console.log("MySql Connected..");
        }

        return connection;
    } catch (e) {
        console.log(e);
    }

}

export default createMySqlConnection;