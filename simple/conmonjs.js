const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const users = require('../project-01/mock-users.json');
const { Timestamp } = require('mongodb');

const app = express();
const PORT = 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/userDB' )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


//Schema for user data
const userSchema = new mongoose.Schema({
    
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,},
    email:{
        type: String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender:{
        type: String,
    },
},
{timestamps :true}
)
//Model for user data
const User = mongoose.model('user', userSchema);

app
  .route("/api/users/:id")
  .get( async(req, res) => {
    const user =await User.findById(req.params.id)
    if(!user) return res.status(404).json({error:" user not found"})
    res.json(user);
  })
 .patch(async(req, res)=>{
     await User.findByIAnddUdate(req.params.id,{lastName :"Changed"})
     return res.json({status:"Success"})
 })
 .delete(async(req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    return  res.json({status:" success"})
 })

app.get('/users', async(req,res)=>{
    const allDbUser = await User.find({})
    const html =
    `
    <ul>
    ${allDbUser
    .map((user)=>`<li> ${user.firstName} - $ ${user.lastName}- ${user.email}</li>`)
    
    }
    </ul>
    `;
     res.send(html)
})

app.post("/api/users", async (req, res) => {
     const body = req.body;
  if(
    ! body.firstName ||
    ! body.lastName ||
    ! body.email ||
    ! body.jobTitle ||
    ! body.gender
  )
  {
    return res.status(400).json({ msg: "All fields are required" });
  }

   const result= await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    jobTitle: body.jobTitle,
    gender: body.gender,
  })
   console.log(result)

  return res.status(201).json({ msg: "User created successfully"})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });