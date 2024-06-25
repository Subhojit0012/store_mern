const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const fsPromise = require("fs").promises;

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromise.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = async (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");

  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logEvents, logger };
