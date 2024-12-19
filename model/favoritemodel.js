

const mongoose = require('mongoose')

const favoriteschema = new mongoose.Schema({


    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    products:{
        type:[
            {

          type:mongoose.Schema.Types.ObjectId,
            ref:"products",
            required:true
        }
    ]
    }
})

const favourites = mongoose.model('favourites',favoriteschema)
module.exports= favourites

