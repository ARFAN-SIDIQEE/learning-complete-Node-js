const express=require('express')
const zlib= require ('zlib')
const fs=require('fs')
const status =require('express-status-monitor')


const app=express()
const PORT=8000

app.use(status())

//Stream read (sample.txt)--->zipper-->fs write --->create zip
fs.createReadStream('./simple.txt').pipe(zlib.createGzip()
.pipe(fs.createWriteStream('./simple.zip')))

app.get('/',(req,res)=>{
    //read file
    // fs.readFile('./simple.txt',(err,data)=>{
    //     res.end(data)
    // })

    // Sream file
    const stream= fs.createReadStream('./simple.txt','utf-8')
    stream.on('data',(chunk)=>{
        res.write(chunk)
    })
    stream.on('end',()=>res.end())

})  

app.listen(PORT,()=>
console.log(`server started at http://localhost:${PORT}`))