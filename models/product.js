const mongoose=require('mongoose');
const Review = require('./review');
const productSchema=new mongoose.Schema({
    name:{type:String,trim:true,required:true},
    img:{type:String,trim:true,default:'/images/product.png'},
    price:{type:Number,min:0,default:0},
    desc:{type:String,trim:true},
    author:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    reviews:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review',
        }
    ]
})


// pre middleware to delete reviews...
productSchema.pre('findOneAndDelete',async function(data)
{
    console.log("Pre Middleware");
    console.log(data);
})


// mongoose middleware fun to delete all the asociated reviews... on a product
productSchema.post("findOneAndDelete",async function (product) {
  console.log("Post Middleware");
  console.log(product);

  // data has reviews so we will delete it here
  if(product.reviews.length>0)
  {
    await Review.deleteMany({_id:{$in:product.reviews}})  // query to delete
  }
});



const Product=mongoose.model('Product',productSchema);
module.exports=Product;