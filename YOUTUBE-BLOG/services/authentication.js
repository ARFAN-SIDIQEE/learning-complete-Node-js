const jwt =require('jsonwebtoken')


const secret= "$uperArfan899"

function createTokenForUser(user){
    const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role
};
    //const token =jwt.sign(payload,secret)
    return jwt.sign(payload,secret)
}

function validateTOken(token){
    //const payload= jwt.verify(token,secret)
    return  jwt.verify(token,secret)
}


module.exports={
    createTokenForUser,
    validateTOken,
}