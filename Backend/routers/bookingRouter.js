const { protectRoute } = require("../controllers/authController");
const path = require('path')
const express = require('express');
const createSession = require("../controllers/bookingController");

const bookingRouter = express.Router()
bookingRouter.post('/createSession',createSession)
// bookingRouter.post('/createSession', protectRoute, createSession)
bookingRouter.get('/createSession', function(req, res){
    console.log(__dirname)
    let dir = path.dirname(__dirname)
    let p = path.join(dir,"/booking.html" )
    // console.log(p)
    res.sendFile(p)
    // res.sendFile("E:/FoodApp/Backend/booking.html")
})
bookingRouter.get('/success',function(req,res){
    res.sendFile("E:/FoodApp/Backend/views/success.html")
})
// bookingRouter.get('/success', async (req, res) => {
//     const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
//     const customer = await stripe.customers.retrieve(session.customer);
  
//     res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
//   });
module.exports = bookingRouter