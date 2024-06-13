const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

const Colours = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        gray: "\x1b[90m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        gray: "\x1b[100m",
        crimson: "\x1b[48m"
    }
};

class Logger {
    constructor() {
        this.logFile = path.join(__dirname, 'app.log');
    }

    log(message, level='INFO') {
        const timestamp = moment().tz("Asia/Kolkata").format();
        const logMessage = `${timestamp} [${level}] ${message}\n`;
        fs.appendFileSync(this.logFile, logMessage);
        
        let color;
        switch (level) {
            case 'INFO':
                color = Colours.fg.green;
                break;
            case 'DEBUG':
                color = Colours.fg.cyan;
                break;
            case 'ERROR':
                color = Colours.fg.red;
                break;
            default:
                color = Colours.reset;
        }

        console.log(`${color}${level}${Colours.reset} - ${message}`);
    }

    info(message) {
        this.log(message, 'INFO');
    }

    debug(message) {
        this.log(message, 'DEBUG');
    }

    error(message) {
        this.log(message, 'ERROR');
    }
}

module.exports = Logger;