const http = require('http');
const fs = require('fs');
const url = require('url');

const myServer = http.createServer((req, res) => {
    if (req.url=== "/favicon.ico") {
        return res.end();
    }
    const log = `${Date.now()}:${req.method} ${req.url} New req received \n`;
    const myUrl = url.parse(req.url, true);
   
fs.appendFile('loges.txt', log, (err, data) => {
        switch (myUrl.pathname) {
            case '/':
                if (req.method === 'GET') {
                res.end("Home Page")}
                break;
            case '/about':
                const userName = myUrl.query.myName ;
                res.end(`About Page ${userName}`);
                break;
            case '/singup':
                if (req.method === 'GET') {
                res.end("Singup Page form");
                }else if (req.method === 'POST') {
                // Data BAse logic here
                res.end("Sucessfully Singup");
                }
            default:
                res.end("404 Page Not Found");
        }
})});
myServer.listen(8000, () => console.log("server started"));