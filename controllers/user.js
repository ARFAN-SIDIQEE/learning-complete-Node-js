const User = require ("../models/user")

async function handleGetAllUsers(req,res) {
    console.log('users')
    const allDbUsers =await User.find({})
    return res.json(allDbUsers)
}

async function handleGetUserById(req,res) {
    const user =await User.findById(req.params.id)
    if(!user) return res.status(404).
    json({error:" user not found"})
    res.json(user);
    
}

async function handleUpdateUserById(req,res) {
     await User.findByIAnddUdate(req.params.id,{lastName :"Changed"})
     return res.json({status:"Success"})
    
}
async function handleDeleteUserById(req,res)  {
     await User.findByIdAndDelete(req.params.id)
    return  res.json({status:" success"})
}
async function handleCreateNewUser(req,res) {
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

  return res.status(201).json({ msg: "User created successfully" ,id:result._id})
    
}

module.exports ={
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser

}