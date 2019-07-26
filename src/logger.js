// import fs from "fs-extra";
// import path from "path";
const fs = require("fs-extra");
var path = require("path");

function writeLog(message) {
  const projPath = path.resolve();
  const logPath = path.join(projPath, "logs");
  if (!fs.existsSync(logPath)) {
    fs.mkdirs(logPath, err => {
      return console.error(err);
    });
    fs.mkdirSync(logPath);
  }
  const filePath = path.join(logPath, "debug.log");
  const writestream = fs.createWriteStream(filePath, {
    flags: "a"
  });
  const newLine = "\r\n";
  const line = `${message}${newLine}`;
  writestream.write(line);
  return true;
}

module.exports.writeLog = writeLog;

// export { writeLog };
// export default { writeLog };
