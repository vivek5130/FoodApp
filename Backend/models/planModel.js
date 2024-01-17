const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config()
const db_link = process.env.DB_LINK;
mongoose.connect(db_link)
    .then(function(db){
        // console.log(db)
        console.log("plan db connected");
    })
    .catch((err)=>{
        console.log(err);
    });

const planSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        maxLength : [20,"Plan name should not exceed 20 characters"] //second arguenment represents custom error message
    },
    duration:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: [true,"Price not entered"]
    },
    ratingsAverage:{
        type:Number

    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount < 100
        },"Discount should not exceed more than 100"]
    }

})
const planModel = mongoose.model('planModel',planSchema);
// (async function createPlan(){
//     let planObj = {
//         name : "SuperFood1",
//         duration : 30,
//         price: 1000,
//         ratingsAverage: 5,
//         discount : 20
//     }
//     // let data = await planModel.create(planObj)
//     // console.log(data)
//     const doc = new planModel(planObj)
//     await doc.save()
// })(); //immediately invoke functions
module.exports = planModel
