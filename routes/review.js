const express=require('express');
const Product = require('../models/product');
const Review = require('../models/review');
const { reviewProduct, isLoggedIn } = require('../middleware');
const router=express.Router();

router.post('/products/:id/review',isLoggedIn,reviewProduct,async(req,res)=>
{
    try {
        const { id } = req.params;
        // const{rating,comment}=req.body;  we can use this or spread operator
        const product = await Product.findById(id);
        const review = new Review({ ...req.body }); // spread Operator
        product.reviews.push(review); // mongo will automatically store the id of review

        await review.save();
        await product.save();

        req.flash('success','Review added successfully');
        res.redirect(`/products/${id}`);
    } catch (error) {
        res.status(400).render('error',{err:error});
    }
    
})

module.exports=router;