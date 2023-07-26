const mongoose=require('mongoose')
const passportLocalMongoose=require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
  email: { type: String, trim: true, required: true },
  role: { type: String, default: "buyer" },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

//plugin userSCahma

userSchema.plugin(passportLocalMongoose);
// now we can access methods buy this plugin....
const User=mongoose.model('User',userSchema);
module.exports=User;