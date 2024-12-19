 
 const jwt = require('jsonwebtoken')

 const jwtmiddlewear =(req,res,next)=>{
    const token = req.headers['authorization'].split(' ')[1]

    try {
        const jwtResponse = jwt.verify(token,'secretkey')
    console.log(jwtResponse);

    req.payload = jwtResponse.userId
    next()
    } catch (error) {
        res.status(401).json('authoeization failed due to error'+error)
        console.log(error);
    }

 }


 module.exports = jwtmiddlewear