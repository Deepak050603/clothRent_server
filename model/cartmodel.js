const mongoose = require('mongoose')

const cartschema = new mongoose.Schema({

    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    products:{
        type:[
            {

          productId:{ type:mongoose.Schema.Types.ObjectId,
            ref:"products",
            required:true
        },
            quantity:{
                type:Number,
                default:1
            }

        }
    ]
    }

})



const carts = mongoose.model('carts',cartschema)
module.exports=carts