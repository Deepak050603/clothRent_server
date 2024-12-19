
const products = require('../model/productmodel')

// add project controll


exports.addprojectcontroller = async(req,res)=>{

    const {productname,clothtype,description,price,quantity,gender,feature1,feature2,feature3,feature4}=req.body
    const productimg = req.file.filename

    try {
        const newproduct = new products({
            productname,clothtype,description,price,quantity,gender,feature1,feature2,feature3,feature4,productimg 
        })
        await newproduct.save()
        res.status(200).json(newproduct)
    } catch (error) {
        res.status(401).json('project failed due to '+error)
        
    }
    
}

// getallproject

exports.getallproductController=async(req,res)=>{

    try {
        const allproject = await products.find()
    res.status(200).json(allproject)
    } catch (error) {
        res.status(401).json(error)
    }
    
}
// get selected project

exports.getselectedprojectcontroller = async(req,res)=>{
    const{id}=req.params
    console.log('inside');
    

    try {
       const selectdproject= await products.findOne({_id:id})
       res.status(200).json(selectdproject)
       console.log(id);
       

    } catch (error) {
        res.status(401).json(error)
        console.log(error);
        
    }
}

// remove user project

exports.removeProductController = async(req,res)=>{
    const {id} = req.params

    try {
       const delet= await products.findByIdAndDelete({_id:id})
        res.status(200).json(delet)
    } catch (error) {
        res.status(401).json(error) 
    }
}


// update controller

exports.updteproductcontroller = async(req,res)=>{
    const {id} = req.params
    const {productname,clothtype,description,price,quantity,gender,size,productimg}=req.body

    const uploadedimage = req.file ? req.file.filename : productimg
    
    try {
        const existingproduct = await products.findByIdAndUpdate({_id:id},{
            productname,
            clothtype,
            description,
            price,
            quantity,
            gender,
            
            productimg:uploadedimage
        },{new:true})
        console.log(existingproduct);
        await existingproduct.save()

        res.status(200).json(existingproduct)
        
    } catch (error) {
        res.status(401).json(error)
    }
}




// getallmenproject

exports.getallmenproductController=async(req,res)=>{

    try {
        const allproject = await products.find({gender:"Men"})
    res.status(200).json(allproject)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// getallwommenproject

exports.getallwommenproductController=async(req,res)=>{

    try {
        const allproject = await products.find({gender:"Women"})
    res.status(200).json(allproject)
    } catch (error) {
        res.status(401).json(error)
    }
    
}