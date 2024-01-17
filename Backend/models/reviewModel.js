const mongoose = require('mongoose')
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

const reviewSchema = new mongoose.Schema({
    review : {
        type:String,
        required: [true, "Review is required"]
    },
    rating:{
        type: Number,
        min: 1,
        max: 10,
        required:[true, "Rating is required"]
    },
    createdAt:{
        type: Date,
        default : Date.now()
    },
    //in reviews section we need to add which user(user name and profile photo) has created it and to which plan they have reviewed
    // so to get the details we are using reference in mongoose
    user:{
        type : mongoose.Schema.ObjectId,
        ref : 'userModel',
        required: [true, "Review must belong to a user"]
    },
    plan:{
        type : mongoose.Schema.ObjectId,
        ref : 'planModel',
        required: [true, "Review must belong to a plan"] 
    }
})
// /^find/ is used to match any method starting with "find." This means it will be triggered for methods like find, findOne, findById, etc.
// reviewSchema.pre('find',function(next){  //   /^find/ is a regular expression
reviewSchema.pre(/^find/,function(next){  //   /^find/ is a regular expression
    this.populate({    //this implies review schema
        path: "user", //in user key
        select:"name profileImage"  //populates only name and profileImage from userModel
    }).populate("plan");  //It populates entire plan object
    next();
})

const reviewModel  = mongoose.model('reviewModel', reviewSchema);
module.exports = reviewModel