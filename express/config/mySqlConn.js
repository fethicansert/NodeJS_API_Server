import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();



// Create the connection to database
const createMySqlConnection = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'test',
      });
}