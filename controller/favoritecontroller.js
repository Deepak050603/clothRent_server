const favorites = require("../model/favoritemodel")
const products = require("../model/productmodel")


exports.addfavoritecontroller = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload

    try {
        const exixstingfavorite = await favorites.findOne({userId})
        console.log(exixstingfavorite);
        
        
        if(exixstingfavorite){
            const updatefavorite = await favorites.findOneAndUpdate({userId},{ $addToSet: {products:id}},{new:true})
            res.status(200).json(updatefavorite)
        }
        else{
            const newfavorite = new favorites({
                userId,
                products:[id]
            })
            await newfavorite.save()
            res.status(201).json(newfavorite)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}



exports.getfavcontroller = async (req, res) => {
    const userId = req.payload; // Assume the user's ID comes from a token payload

    try {
        // Find the user's cart and populate the product details
        const fav = await favorites.findOne({ userId }).populate('products');

        if (!fav) {
            return res.status(401).json({ message: "fav not found" });
        }

        res.status(200).json(fav);
    } catch (error) {
        console.error(error);
        res.status(406).json(error);
    }
};


exports.removefavitemcontroller = async(req,res)=>{
    const {id}=req.params
    const userId = req.payload
    
    try {
        const existingfav = await favorites.findOne({userId})
//     const pruductIndex = existingcart.products.findIndex(item=>item.productId==id)
//  console.log(pruductIndex);
 
       const updatefav =await favorites.findOneAndUpdate({userId},{$pull:{products:id}},{new:true})
        res.status(200).json(updatefav )
     
    } catch (error) {
        res.status(401).json(error)
    }
  
}