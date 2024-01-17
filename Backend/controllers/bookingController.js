const dotenv = require("dotenv")
dotenv.config()
let SK = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(SK)
const userModel = require('../models/userModel')
const planModel = require('../models/planModel')

    async function createSession(req, res){
    try{
        // let userId = req.id
        let planId = req.body  //for temporary
        // let planId = req.params.id
        // const user = await userModel.findById(userId)
        // const plan = await planModel.findById(planId)
        const session = await stripe.checkout.sessions.create({
            payment_method_types :  ['card'],
            customer_email : "something@gmail.com",
            client_reference_id : "someid",
            // customer_email : user.email,
            customer_email : "something@email.com",
            // client_reference_id : plan.id,
            line_items:[
                {
                    
                    // // name: plan.name,
                    // // description: plan.description,
                    // price : 5000,  //to-do remove this 100
                    // // amount : plan.price *100,  //to-do remove this 100
                    // currency:'inr' ,
                    price: 'price_1OWXnQSHPlwReDFEYGNuhdTQ',    
                    quantity: 1
                }
            ],
            mode: 'payment',
        //    success_url: `http://localhost:4000/booking/success`,
        //    return_url: `http://localhost:4000/booking/success`,
           success_url: "http://localhost:4000/booking/success?session_id={CHECKOUT_SESSION_ID}",
           cancel_url: `${req.protocol}://${req.get("host")}/profile`,

        })
        res.status(200).json({
            status : "Success" ,
            session
        })
    }
    catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

module.exports = createSession