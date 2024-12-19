const users = require("../model/userModel");
const jwt = require('jsonwebtoken')


const bycrypt = require('bcrypt')




//  register
exports.register= async(req,res)=>{
    // logic
    const{username,email,password}= req.body
    console.log(username,email,password);
    
    try {
        const existinguser = await users.findOne({email})
        if(existinguser){
            
           
            res.status(406).json('user aleready exist')
        }
        else{
            const encryptPassword = await bycrypt.hash(password,10)
            const newuser = new users({
                username,
                email,
                password:encryptPassword
               
                

            })
            await newuser.save()
            res.status(200).json(newuser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// login 
exports.login=async(req,res)=>{
    const {email,password} = req.body
    console.log(email,password);
  
    try {
      const existinguser =await users.findOne({email})
      if(existinguser){
        console.log(existinguser.password);
        
        const match = await bycrypt.compare(password,existinguser.password)
        console.log(match);
        

            if(match==true){
                const token = jwt.sign({userId:existinguser._id},"secretkey")
          res.status(200).json({existinguser,token})
            }
            else{
                res.status(404).json('invalid password')
            }
          
      }
      else{
          res.status(406).json('Incorrect email id or password')
      }
    } catch (error) {
      res.status(401).json(error)
  
      
    }
    
  }

  // getallproject

exports.getalluserController=async(req,res)=>{

    try {
        const alluser = await users.find()
    res.status(200).json(alluser)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.getuserdetailscontroller= async(req,res)=>{

    const userId = req.payload
   console.log(userId);
   
    
    try {
        const existinguser = await users.findOne({_id:userId})
        res.status(200).json(existinguser)
    } catch (error) {
        res.status(401).json(error)
    }
}


// update user


exports.updateuserdetailscontroller = async (req,res)=>{
    const userId = req.payload
    const {username,email,profileImg,phoneNumber,adress} = req.body
    console.log(username,email,profileImg,phoneNumber,adress);
   
   
    
    const uploadedimage = req.file ? req.file.filename : profileImg
    console.log(userId);
    console.log(uploadedimage);
    
    try {

        const existinguser = await users.findByIdAndUpdate({_id:userId},{
            username,
            email,
            phoneNumber,
            adress,
            profileImg:uploadedimage
        },{new:true})
        console.log(existinguser);
        

        await existinguser.save()
        res.status(200).json(existinguser)
        
    } catch (error) {
        // console.log(error);
        
res.status(401).json(error)
    }
}