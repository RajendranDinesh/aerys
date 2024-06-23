const mysql = require('mysql2');
require('dotenv').config();

const Logger = require('../utils/logger');
const logger = new Logger();

const dbConfig = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    debug: false,
};

const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise();

promisePool.query('SELECT 1')
    .then(() => {
        logger.info('[DB] Connection Succeded');
    })
    .catch((err) => {
        logger.error(`[DB] Connection Failed ${err}`);
    });

module.exports = promisePool;