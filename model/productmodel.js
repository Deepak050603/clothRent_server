const mongoose = require('mongoose')

const productschema = new mongoose.Schema({

    productname:{
        type:String,
        required:true
    },
    clothtype:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    feature1:{
        type:String,
        required:true
    },
    feature2:{
        type:String,
        required:true
    },
    feature3:{
        type:String,
        required:true
    },
    feature4:{
        type:String,
        required:true
    },
    
    productimg:{
        type:String,
        required:true
    },
})


const products = mongoose.model('products',productschema)
module.exports=products