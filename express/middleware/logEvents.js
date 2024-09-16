import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import { mkdir, appendFile } from 'fs/promises';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';


const __dirname = dirname(fileURLToPath(import.meta.url));

const writeLog = async (message, fileName) => {

    const logDirectory = join(__dirname, '..', 'logs');
    const logFile = join(logDirectory, fileName);
    const dateTime = format(new Date(), 'yyyy/MM/dd-HH:mm:ss');
    const logMessage = `log_id: ${uuid()} log_time: ${dateTime} log_message: ${message}\n`;

    try {
        if (!existsSync(logDirectory)) {
            await mkdir(logDirectory);
        }
        await appendFile(logFile, logMessage);
    } catch (err) {
        console.error(err)
    }
}

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    writeLog(`${req.method} ${req.headers.origin} ${req.url}`, 'requestLogs.txt');
    next();
}


export { writeLog, logger }