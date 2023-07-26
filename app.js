const express=require('express')
const app=express();
const path=require('path')
const port=process.env.PORT || 5000;
const seedDB =require('./seed')
const mongoose=require('mongoose');
const productRoutes=require('./routes/product');
const reviewRoutes=require('./routes/review');
const authRoutes=require('./routes/auth');
const productApi=require('./routes/api/productApi')
const cartRoutes=require('./routes/cart')
const ejsMate=require('ejs-mate')
const methodOverride=require('method-override');
const session=require('express-session')
const flash=require('connect-flash')  //for flash messeges
const passport=require('passport')
const LocalStrategy=require('passport-local');
const User = require('./models/user');
mongoose
  .connect(
    "mongodb+srv://vinaytomar107:vinaytomar107@cluster0.6dwkb5n.mongodb.net/EcomV1"
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.engine('ejs',ejsMate);  // for defiening boilerplate
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


const sessionConfig = {
  secret: "WeeNeedSomeSeceret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1 * 24 * 60 * 60 * 1000,  //setting for 1 day
    maxAge: 1 * 24 * 60 * 60 * 1000,
  },
};



app.use(session(sessionConfig));
app.use(flash());

//intializing middleware for password auth
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));  //password authentication


app.use((req,res,next)=>
{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success');
    
    res.locals.error = req.flash("error");
    next();
})

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(productApi);
app.use(cartRoutes);
app.get("/",(req,res)=>
{
    res.redirect('/products')
})

// seedDB();    

app.listen(port,()=>
{
    console.log(`Running at ${port}`);
})