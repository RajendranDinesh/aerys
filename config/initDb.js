const mongoose = require('mongoose');
require('dotenv').config();

const Logger = require('../utils/logger');
const logger = new Logger();

module.exports = async function initDb() {
    mongoose.connect(process.env.DATABASE_URI, {
        connectTimeoutMS: 10000,
        socketTimeoutMS: 10000,
    })
        .then(() => {
            logger.info(`[DB] Connection Succeded`);
        })
        .catch((error) => {
            logger.error(`[DB] Connection Failed ${error}`);
        })
}