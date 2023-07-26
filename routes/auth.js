const express=require('express');
const User = require('../models/user');
const passport = require('passport');

const router=express.Router()

// router.get('/fakeuser',async(req,res)=>
// {
//     const user={
//         email:'Vinay@gmail.com',
//         username:'Vinay',
//     }
//    const newUser= await User.register(user,'123');
//     res.send(newUser);
// })


router.get('/register',(req,res)=>
{
    res.render('auth/signup');
})

router.post('/register',async(req,res)=>
{

   
    try {
        
        const { username, email, role,password } = req.body;
        const user = new User({ username, email ,role});
        const newUser = await User.register(user, password);

        req.login(newUser, function (err) {
          if (err) {
            return next(err);
          }
          req.flash("success", "Successfully Registred and logged In!!");
          return res.redirect("/products");
        });
        
    } catch (error) {
        req.flash('error',error.message);
        res.redirect('/register');
    }

  
})


router.get('/login',(req,res)=>
{
    res.render('auth/login');
})

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
    keepSessionInfo: true,
  }),
  (req, res) => {
    // console.log(req.user);
    req.flash("success", `Welcome Back again!! ${req.user.username}`);
    // console.log(req.session);
    let redirectUrl = req.session.returnUrl || '/products';

    //loigc for reviews redirect
    if(redirectUrl&& redirectUrl.indexOf('review')!==-1)
    {
        redirectUrl=redirectUrl.split('/');
        redirectUrl.pop();
        redirectUrl=redirectUrl.join('/');
    }
    delete req.session.returnUrl;
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error(err);
    }
    req.flash("success", "GoodBye!!");
    res.redirect("/products");
  });
});

module.exports=router;