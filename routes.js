

const express = require('express')

const router =  new express.Router()

const userController = require('./controller/userController')
const productcontroller = require('./controller/productcontroller')
const favoritecontroller = require('./controller/favoritecontroller')
const cartcontroller = require('./controller/cartcontroller')
const multerConfig =require('./middlewear/multermiddlewear')

const jwtmiddlewear = require('./middlewear/jwtmiddlewear')


// register

router.post('/register',userController.register)

// login 

router.post('/login',userController.login)

// add product

router.post('/add-product',jwtmiddlewear,multerConfig.single('productimg'),productcontroller.addprojectcontroller)

// get all product

router.get('/allproduct',productcontroller.getallproductController)

// get all men product

router.get('/allmenproduct',productcontroller.getallmenproductController)
// get all women product

router.get('/allwomenproduct',productcontroller.getallwommenproductController)

// /getall user

router.get('/alluser',jwtmiddlewear,userController.getalluserController)

// remove product

router.delete('/remove-adminproduct/:id',jwtmiddlewear,productcontroller.removeProductController)

// edit product

router.put('/edit-product/:id',jwtmiddlewear,multerConfig.single('productimg'),productcontroller.updteproductcontroller)

// add to cart 
router.post('/add-to-cart/:id',jwtmiddlewear,cartcontroller.addtocartcontroller)

// get cart
router.get('/getcart',jwtmiddlewear,cartcontroller.getCartcontroller)

// remove from cart

router.delete('/removecartitem/:id',jwtmiddlewear,cartcontroller.removecartitemcontroller)

// increment cart quantity

router.put('/increment/:id',jwtmiddlewear,cartcontroller.increasecartitemcontroller)

// decrement cart quantity

router.put('/decrement/:id',jwtmiddlewear,cartcontroller.decrementcartitemcontroller)

// add to favorite

router.post('/add-to-fav/:id',jwtmiddlewear,favoritecontroller.addfavoritecontroller)

// get fav

router.get('/getfav',jwtmiddlewear,favoritecontroller.getfavcontroller)

// remove fav

router.delete('/removefav/:id',jwtmiddlewear,favoritecontroller.removefavitemcontroller)

// get userdetails

router.get('/getuserdetails',jwtmiddlewear,userController.getuserdetailscontroller)

// edit userdetails

router.put('/edituserdetails',jwtmiddlewear,multerConfig.single('profileImg'),userController.updateuserdetailscontroller)

// get selected project

router.get('/getdetails/:id',productcontroller.getselectedprojectcontroller)

// get cart quantity

router.get('/getquantity/:id',jwtmiddlewear,cartcontroller.getquantitycontroller)

 module.exports =router



