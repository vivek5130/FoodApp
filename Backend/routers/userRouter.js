const express = require("express");
const userRouter = express.Router();
const multer = require('multer')
// const protectRoute = require("./authHelper");

const {
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
  updateProfileImage,
} = require("../controllers/userController");
const {
  signup,
  login,
  isAuthorised,
  protectRoute,
  forgetpassword,
  resetpassword,
  logout,
  resetpasswordPage
} = require("../controllers/authController");
const userModel = require("../models/userModel");
// console.log(__dirname)
// user options
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

//signup
userRouter.route("/signup").post(signup);
//login
userRouter.route("/login").post(login);

//forget pass
userRouter.route("/forgetpassword").post(forgetpassword);

userRouter.route("/resetpassword/:token").get(resetpasswordPage);
userRouter.route("/resetpassword/:token").post(resetpassword);
userRouter.route("/logout").get(logout);

//Multer for fileUpload
// upload ->Storage, filter
//It indicates where it is stored and what name is given to it
const multerStorage = multer.diskStorage({
  destination : function(req,res, cb){  //cb is call back function
    cb(null,"public/img/users")    // if error dont store anywhere else store in given path
  }, 
  filename:function(req, res,cb){
    const useremail = req.params.email
    console.log("Email is: ", useremail)
    // cb(null, `user-${Date.now()}.jpeg`)  //we need to pass unique names to it so it handles it and assigns a name
    cb(null, `user-${useremail}.jpeg`)  //we need to pass unique names to it so it handles it and assigns a name
    
  }
})
const filter = function(req, file, cb){
  if(file.mimetype.startsWith('image')){
    cb(null, true)
  }else{
    cb(new Error("Not an Image, Please upload a image"))
  }
}
const upload = multer({
  storage: multerStorage,  //where to store
  fileFilter: filter       //filter function used to check if the format of file is jpeg or else filter it
})

//adding and recieving profile image using multer
userRouter.post("/ProfileImage/:email",upload.single("photo"), updateProfileImage)  //photo is name given to input field in multer.html for uploading images
userRouter.get('/ProfileImage/:email', (req,res)=>{
  const useremail = req.params.email;
  console.log(useremail)
  res.sendFile("E:/FoodApp/Backend/multer.html")
})
//added changed
userRouter.get('/image/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log(filename)
  const path = `E:/FoodApp/Backend/public/img/users/${filename}`;
  console.log(path)
  // console.log(__dirname)
  res.sendFile( path);
});

//User routes for profile page
userRouter.use(protectRoute); //ensuring the user is logged in
userRouter.route("/userProfile").get(getUser);


// admin will be able to access all users
userRouter.use(isAuthorised(["admin"])); //ensuring that current user is admin if it is then call next function to get all users
userRouter.route("/").get(getAllUser);
// userRouter.route("/getCookies").get(getCookies);
// userRouter.route("/setCookies").get(setCookies);

module.exports = userRouter;
