const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require('bcrypt');
const {sendMail} = require('../utility/nodemailer');
const { MongoCryptInvalidArgumentError } = require("mongodb");
// const cookieParser = require('cookie-parser');
const JWT_KEY = process.env.JWT_KEY;

// auth Controler
async function signup(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    sendMail("signup", user); //sends mail to user // to-do write if user is found i.e move it down
    if (user) {
      res.json({
        messages: "user signed up",
        data: user,
      });
    } else {
      res.json({
        error: "error while signing up ",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

//   async function postSignUp(req, res) {
//     let dataObj = req.body;
//     let user = await userModel.create(dataObj);
//     console.log("signed up obj: ", user);
//     res.json({
//       message: "User signed up",
//       data: user,
//     });
//   }

//   function middleware1(req, res, next){
//       console.log("Middleware1 encountered");
//       next();
//   }
// function middleware2(req, res, next){
//     console.log("Middleware2 encountered");
//     // next();
// }

async function login(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        // console.log(data.password, " and " ,user.password)
        const isMatch = await bcrypt.compare(data.password, user.password);
        // console.log("match or not: ",isMatch)
        if (isMatch) {
          let uid = user["_id"];
          let token = jwt.sign({ payload: uid }, JWT_KEY); //signature
          // res.cookie("login", token, { httpOnly: true }); //setting cookie for logged in or not to provide protected route . ie to show content only to logged in users only
          let mycookie = res.cookie("login", token,{sameSite: 'None'}); //setting cookie for logged in or not to provide protected route . ie to show content only to logged in users only
          console.log(mycookie)
          return res.json({
            message: "User is logged in",
            data: data,
            userId : uid
          });
        } else {
          res.json({
            message: "You have entered wrong password",
          });
        }
      } else {
        return res.json({
          message: "User is not found",
        });
      }
    } else {
      return res.json({
        message: "Please enter a email address ",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
}

//is authorised to check if user is admin or user etc

function isAuthorised(roles) {
  return function (req, res, next) {
    // if (roles.includes(req.role) == true) {
    if (req.role == 'admin') {
      next();
    } else {
      res.status(401).json({
        message: "You are not authorised to access it",
      });
    }
  };
}
// in payload we have uid
// using id we find user
// we send role and id in req so that next function i.e getUser will be able to access role and id
async function protectRoute(req, res, next) {
  try {
    let token;
    // console.log("cookis in pr: ",req.cookies.login)
    if (req.cookies.login) {
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);
      if (payload) {
        const user = await userModel.findById(payload.payload);
        if(user){
          
          req.role = user.role;
          req.id = user.id;
          next()
        }else{
          res.json({
            message:"no user is found in protectRoute"
          })
        }
       
      } else {
        return res.json({
          message: "Please login again",
        });
      }
    }
     
    else{
      const client = req.get('User-Agent')
      if(client.includes('Mozilla') == true){
        return res.redirect('/login')
      }
      
      //this is a response to testers in postman or thunder client
      res.json({
        message:"Please login"
      })
    }
  } catch (err) {
    return res.json({
      error: err.message,
    });
  }
}

async function forgetpassword(req,res){

  let {email} = req.body;
  try{
    let user = await userModel.findOne({email: email})
    if(user){
      let resetToken = user.createResetToken();  //creating a reset token using methods available in mongoose schema to create new token
      user.save();  //changed
      let resetPasswordLink = `${req.protocol}://${req.get('host')}/user/resetpassword/${resetToken}`
      // send email to user using nodemailer
      let obj = {
        resetPasswordLink,
        email
      }
      // sendMail("resetpassword",obj)
      return res.json({
        message:"Check out your mail for password",
        passLink: resetPasswordLink
      })  
    }else{
      res.json({
        message:"Please signup",
      })
    } 
  }
  catch(err){
    res.status(500).json({
      error : err.message
    })
  }

}

async function resetpassword(req,res){
  try{
  const token  = req.params.token
  const {password, confirmPassword} = req.body;
  const user = await userModel.findOne({resetToken:token})
  if(user){
    //reset password handler will update users password in db
  user.resetPasswordHandler(password, confirmPassword)
  await user.save()
  res.json({
    message:"user pass is changed successfully please login again"

  })
  //To-Do redirect to login page
  }
  else{
    res.json({
      message:"User is not found to reset password"
    })
  }
  
}
catch(err){
  res.json({
    error: err.message
  });
}

}

function logout(req, res){
  res.cookie('login', ' ', {maxAge: 1})//destroying login cookie within 1ms
  res.json({
    message: "user logged out successfully"
  })
   
}
function resetpasswordPage(req, res){
  res.sendFile();
}

module.exports = {
  signup,
  login,
  isAuthorised,
  protectRoute,
  forgetpassword,
  resetpassword,
  logout,
  resetpasswordPage
};
