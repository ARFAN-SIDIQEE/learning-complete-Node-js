const http = require('http');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
   return res.send("Home Page");
});

app.get('/about', (req, res) => {
   
   return res.send("Hello fromo about page" + " hey" + req.query.name + "you are " + req.query.age);
});

app.post('/signup', (req, res) => {
    // Database logic here
    return res.send("Successfully Signed Up");
});

app.get ('/profile', (req, res) => {
   return res.send("Profile Page");
});

app.listen(8000, () => console.log("Server started on port 8000"));

// const myServer = http.createServer(app);
// myServer.listen(8000, () => console.log("server started"));