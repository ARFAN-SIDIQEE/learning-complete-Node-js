const express = require('express');
const fs = require('fs');

const {logReqRes}= require ("./middlewares/index")
const {connectMongoDb}= require ('./connection.js')
const userRouter = require('./routes/user')

const app = express();
const PORT = 8000;

//Connect to MongoDB
connectMongoDb("mongodb://127.0.0.1:27017/userDB'").then(()=> console.log("MongoDb Connected"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(logReqRes("log.txt"))

// Routes 
app.use("/api/users",userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });