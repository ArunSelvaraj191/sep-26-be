const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors") 
// const mongoose = require("mongoose")

const authRoute = require("./routes/authRoutes")
const paymentsRoute = require("./routes/paymentsRoutes")
const transactionRoute = require("./routes/transactionsRoutes");
const { default: mongoose, mongo } = require("mongoose");

const app = express();
app.use(express.json()) // will get json format from FE
app.use(cors()) // will resolve cross origin from FE to BE
dotenv.config(); // getting a environment variable from .env file


const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.get("/",(req,res)=>{
    res.send("Welcome to node js with express js")
})

// app.get("/auth",(req,res)=>{
//     res.send("Welcome to Auth Routes")
// })

// app.get("/payments",(req,res)=>{
//     res.send("Welcome to Payments route")
// })
// app.get("/transactions",(req,res)=>{
//     res.send("Welcome to Transactions route")
// })

// app.use("/payments",paymentsRoute)
// app.use("/transactions",transactionRoute)

app.use("/auth",authRoute);

console.log("MONGODB_URI=>",MONGODB_URI)
mongoose.connect(MONGODB_URI)
   .then(() => console.log('Mongo connected'))
   .catch(err => console.error(err));
   
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})