const carts = require("../model/cartmodel")



exports.addtocartcontroller = async(req,res)=>{
   const {id}=req.params
   const userId = req.payload
   console.log(userId);
   

   try {
    
    const existingcart = await carts.findOne({userId})
    if(existingcart){
        const pruductIndex = existingcart.products.findIndex(item=>item.productId==id)
        if(pruductIndex !== -1){
            // existingcart.products[pruductIndex]={productId:id,quantity:existingcart.products[pruductIndex].quantity+1}
            // const updatecart = await carts.findOneAndUpdate({userId},{$addToSet:{products:{productId:id,quantity:pruduct.quantity+1}}},{new:true})
            // await existingcart.save()
            res.status(204).json('already in cart')
        }else{
            const updatecart = await carts.findOneAndUpdate({userId},{$addToSet:{products:{productId:id}}},{new:true})
            res.status(200).json('added to cart succesfully')
        }
    }else{
        const newcart = new carts({
            userId,
            products:[{productId:id}]
        })
        await newcart.save()
        res.status(200).json('added to cart succesfully')
    }
   } catch (error) {
    res.status(406).json(error)
   }

}




exports.getCartcontroller = async (req, res) => {
    const userId = req.payload; // Assume the user's ID comes from a token payload

    try {
        // Find the user's cart and populate the product details
        const cart = await carts.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(401).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(406).json({ message: "Error fetching cart", error: error.message });
    }
};


exports.removecartitemcontroller = async(req,res)=>{
    const {id}=req.params
    const userId = req.payload
    
    try {
        const existingcart = await carts.findOne({userId})
//     const pruductIndex = existingcart.products.findIndex(item=>item.productId==id)
//  console.log(pruductIndex);
 
        await carts.findOneAndUpdate({userId},{$pull:{products:{productId:id}}},{new:true})
        res.status(200).json( existingcart)
     
    } catch (error) {
        res.status(401).json(error)
    }
  
}

exports.increasecartitemcontroller = async(req,res)=>{
    const {id} = req.params
    userId = req.payload

    try {
        
        const existingcart = await carts.findOne({userId})
        const pruductIndex = existingcart.products.findIndex(item=>item.productId==id)
        existingcart.products[pruductIndex]={productId:id,quantity:existingcart.products[pruductIndex].quantity+1}

        await existingcart.save()
        res.status(200).json(existingcart.products[pruductIndex].quantity)

        
    } catch (error) {
        res.status(401).json(error)
    }

}
exports.decrementcartitemcontroller = async (req,res)=>{
    const {id} = req.params
    userId = req.payload

    try {

        const existingcart = await carts.findOne({userId})
        const pruductIndex = existingcart.products.findIndex(item=>item.productId==id)
        if(existingcart.products[pruductIndex].quantity>1){
            existingcart.products[pruductIndex]={productId:id,quantity:existingcart.products[pruductIndex].quantity-1}

            await existingcart.save()
        res.status(200).json(existingcart.products[pruductIndex].quantity)
        }
        else{
            res.status(406).json('only one left')
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getquantitycontroller = async(req,res)=>{

    const userId = req.payload
    const {id} = req.params
 
    console.log(userId);

    console.log(id);
    
    

    try {
        const existingcart = await carts.findOne({userId})

        const quantity = existingcart.products.find((item)=>item.productId==id).quantity

        res.status(200).json(quantity)
    
    } catch (error) {
        res.status(401).json(error)
        console.log(error);
        
    }

   
}
