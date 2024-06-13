const http = require('http');
require('dotenv').config();

const app = require('./src/app');
const Logger = require('./utils/logger');
const initDb = require('./config/initDb');

const logger = new Logger();
const PORT = process.env.PORT || 3000;

// initDb();

const server = http.createServer(app);

server.listen(PORT, () => {
    logger.info(`[SERVER] Live at ${PORT}`)
});