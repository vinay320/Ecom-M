const mongoose=require('mongoose');
const Product = require('./models/product');

const products = [
  {
    name: "Iphone",
    img: "https://images.unsplash.com/photo-1638038772924-ef79cce2426d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    price: 300,
    desc: "The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface.",
  },

  {
    name: "Rebook Shoes",
    img: "https://images.unsplash.com/photo-1635357423680-26dfde2dca0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    price: 100,
    desc: "Clean, minimalist design for the win. These shoes show off an 80s-inspired tennis-themed aesthetic with contrast side stripes. ",
  },
  {
    name: "Apple Watch",
    img: "https://images.unsplash.com/photo-1611864598766-0dadbf1f21d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80",
    price: 200,
    desc: "Portable timepiece designed to be worn on the wrist or carried in the pocket. ",
  },
  {
    name: "Macbook Pro",
    img: "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    price: 400,
    desc: "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM. The Apple MacBook Pro packs 512GB of SSD storage.",
  },
  {
    name: "Iphone",
    img: "https://images.unsplash.com/photo-1638038772924-ef79cce2426d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    price: 300,
    desc: "The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface.",
  },

  {
    name: "Rebook Shoes",
    img: "https://images.unsplash.com/photo-1635357423680-26dfde2dca0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    price: 100,
    desc: "Clean, minimalist design for the win. These shoes show off an 80s-inspired tennis-themed aesthetic with contrast side stripes. ",
  },
  {
    name: "Apple Watch",
    img: "https://images.unsplash.com/photo-1611864598766-0dadbf1f21d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80",
    price: 200,
    desc: "Portable timepiece designed to be worn on the wrist or carried in the pocket. ",
  },
  {
    name: "Macbook Pro",
    img: "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    price: 400,
    desc: "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM. The Apple MacBook Pro packs 512GB of SSD storage.",
  },
];


async function seedDB()
{
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Done added");
}

module.exports=seedDB;