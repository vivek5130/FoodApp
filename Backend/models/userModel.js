const mongoose = require('mongoose')
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt')
const crypto  = require('crypto')
const dotenv = require("dotenv")
dotenv.config()
const db_link = process.env.DB_LINK;
mongoose.connect(db_link)
    .then(function(db){
        // console.log(db)
        console.log("user db connected");
    })
    .catch((err)=>{
        console.log(err);
    });

const userSchema = mongoose.Schema({
        name:{
            type:String,
            required: true
        },
        email : {
            type: String,
            required: true,
            unique : true,
            validate : function(){
                return emailValidator.validate(this.email);
            }
        }, 
        password:{
            type: String,
            required : true,
            minLength: 4 // mini char is 7
        },
        confirmPassword: {
            type:String,
            // required: true,
            minLength : 4,
            validate: function(){
                if(this.confirmPassword == this.password){
                    console.log("Pass and confirm pass is matched")
                }else{
                    console.log("Pass and confirm pass is not matched")
                }
                return [this.confirmPassword == this.password, "error Password and confirm password is not matched"]
            }
        },
        role:{
            type: String,
            enum :['admin', 'user', 'restaurentOwner','deliveryBoy'],
            default : 'user'
        },
        profileImage:{
            type: String,   //since we are using multer
            default : 'img/users/default.jpg'
        },
        resetToken:String   //storing reset token
})

//models
//before save occurs in db
userSchema.pre('save',function(){
    //removing confirm password from db as it is not useful to store
    this.confirmPassword = undefined;
    // console.log('Before saving in db',this);
})
// Hashing password before saving it to the database
userSchema.pre('save',async function(){
    try{
        if (this.isModified('password') || this.isNew) {
    const salt= await bcrypt.genSalt(7);
    const hashedString  =await bcrypt.hash(this.password, salt);
    // console.log("Hashed password is: ",hashedString)
    this.password  =hashedString;  
}
    }
    catch(err){
        console.log(err.message)
    } 
})
//after save occurs in db
userSchema.post('save',function(doc){  //doc contain the data that is saved 
    console.log('Saved successfully');
})

//creating methods in mongoose schema
//in create reset token we are reseting our token when we forgot our password
userSchema.methods.createResetToken = function(){
    //use crypto to generate token // to download npm i crypto
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetToken = resetToken;
    return resetToken
}
//in reset pass we are taking pass and confirm pass as input and updating in our db
userSchema.methods.resetPasswordHandler = async function (password, confirmPassword){
    const salt= await bcrypt.genSalt(7);
    const hashedString  =await bcrypt.hash(password, salt);
    this.password = hashedString;
    this.confirmPassword = confirmPassword;
    this.resetToken = undefined;  //similar to confirm pass we are not storing resetToken in db
}

const userModel = mongoose.model('userModel',userSchema);
module.exports = userModel