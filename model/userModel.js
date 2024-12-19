// import mongoose

const mongoose = require('mongoose')



const userschema = new mongoose.Schema({
    username :{
        required :true,
        type : String
    },
    email :{
        required :true,
        type : String,
        unique:true
    },
    password :{
        required :true,
        type : String
    },
    role:{
        type:String,
        required:true,
        default:'user'
    },
    profileImg:{
        type:String,
       default:""
    },
    phoneNumber:{
        type:String,
        default:""
    },
    adress:{
        type:String,
        default:""
    }
})


// create model

const users = mongoose.model("users",userschema)

// export

module.exports=users