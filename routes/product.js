const express=require('express');
const Product = require('../models/product');
const Review = require('../models/review');
const Joi = require('joi');
const { validateProduct, isLoggedIn, isSeller, isProductAuthor } = require('../middleware');
const router=express.Router()
router.get('/products',async(req,res)=>
{
    try {
        const products = await Product.find({});
        res.render("products/index", { products });
    } catch (error) {
        res.status(500).render('error',{err:error});   //for error  
    }
    
})

router.get('/products/new',isSeller,isLoggedIn,(req,res)=>
{
    try {
        res.render("products/new");
    } catch (error) {
        res.status(401).render("error", { err: error }); 
    }
})


router.post('/products',isLoggedIn,isSeller,validateProduct,async(req,res)=>
{
    try {
        const { name, img, price, desc } = req.body;
        await Product.create({ name, img, price: parseFloat(price), desc,author:req.user._id });
         req.flash("success", "Product Created successfully");
        res.redirect("/products");
    } catch (error) {
        res.status(401).render("error", { err: error });
    }
})

router.get('/products/:id',async(req,res)=>
{
    try {
        const { id } = req.params;
        // const product=await Product.findById(id);  old code without review

        const product = await Product.findById(id).populate("reviews");
        console.log(product);
        res.render("products/show", { product });
        
        } catch (error) {
           res.status(401).render("error", { err: error });
    }
})

router.get('/products/:id/edit',isLoggedIn,isProductAuthor,async(req,res)=>
{
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render("products/edit", { product });
    } catch (error) {
     res.status(401).render("error", { err: error });   
    }
})

router.patch('/products/:id',isLoggedIn,isProductAuthor,validateProduct,async(req,res)=>
{
   try {
     const { id } = req.params;
     const { name, img, price, desc } = req.body;
     await Product.findByIdAndUpdate(id, { name, img, price, desc });
     req.flash("success", "Edited successfully");
     res.redirect(`/products/${id}`);
   } catch (error) {
    res.status(500).render('error',{err:error});
   }
})

router.delete('/products/:id',isLoggedIn,isProductAuthor,async(req,res)=>
{
    try {
        const { id } = req.params;

        // to also delete the reviews
        // const product=await Product.findById(id);
        // for(let id of product.reviews)
        // {
        //     await Review.findByIdAndDelete(id);
        // }

        //not good Way..
        ///......

        //new way using middlewares

        await Product.findByIdAndDelete(id);
        req.flash("success", "Deleted successfully");
        res.redirect("/products");
    } catch (error) {
        res.status(401).send("Error");
    }
})
module.exports=router;