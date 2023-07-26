const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Product = require("../models/product");
const { isLoggedIn } = require("../middleware");

router.get('/user/cart',isLoggedIn,async(req,res)=>
{
    const user=await User.findById(req.user._id).populate('cart');
    const ttm=user.cart.reduce((sum,curr)=>sum+curr.price,0)
    res.render('cart/cart',{user,ttm});     
})

router.post('/user/:pid/add',isLoggedIn,async(req,res)=>
{
    const {pid}=req.params;
    const userid=req.user._id;
    
    const product = await Product.findById(pid);
    const user=await User.findById(userid);
    user.cart.push(product);
    await user.save();
    res.redirect('/user/cart');
    
})


module.exports = router;
