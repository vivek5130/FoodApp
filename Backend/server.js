const express = require('express')
const userModel = require('./models/userModel')
const cookieParser = require('cookie-parser')

const userRouter = require('./routers/userRouter')
const planRouter = require('./routers/planRouter')
const reviewRouter = require('./routers/reveiwRouter')
const dotenv = require("dotenv")
const bookingRouter = require('./routers/bookingRouter')
dotenv.config()
// console.log(process.env.JWT_KEY)
const cors = require('cors')
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
    // const userRouter = express.Router()
// const authRouter = express.Router()
const port = process.env.PORT ||4000 
app.listen(port,'localhost',()=>{
    console.log("Listening at port ", port)
});

//middleware
//it is used to convert json data to javascript object 
app.use(express.json());
app.use(cookieParser());
// let users = [
//     {
//         'id' : '1',
//         'name' : 'vivek'
//     },
//     {
//         'id' : '2',
//         'name' : "ganathe"
//     },
//     {
//         'id' : '3',
//         'name' : "seenu"

//     }
// ];

app.use('/user',userRouter);
app.use('/plans',planRouter)
app.use('/review',reviewRouter)
app.use('/booking',bookingRouter)
// app.use('/auth', authRouter)


// const planModel = require('./models/planModel')


//handling cookies



// (async  function createUser(){
//     let user = {
//         name :"vivekgana",
//         email : "asdf",
//         password: "asdf",
//         confirmPassword: "asdf"
//     };
//     let data = await userModel.create(user);
//     console.log(data);

// })();   //immediately invoking function

