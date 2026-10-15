const fs = require("fs");

function logReqRes(filename) {
    return (req, res, next) => {
        const log = `${Date.now()}: ${req.method} ${req.path}\n`;

        fs.appendFile(filename, log, (err) => {
            if (err) {
                console.log("Error writing log:", err);
            }

            next();
        });
    };
}

module.exports = {
    logReqRes,
};