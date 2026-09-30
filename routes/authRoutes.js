const router = require("express").Router();
const User = require("../models/userSchema")

router.post("/register", async (req,res)=>{
    try{
        const {email} = req.body;
        const userExist = await User.find({email});
        if(userExist.length != 0){
            return res.status(200).json({message : "User already exist"})
        }else{
            const newUser = await User.create(req.body);
            return res.status(201).json({message : "User created successfully", user : newUser})
        }
    }catch (error){
        console.log("error =>",error)
        res.status(500).json({message : "Something went wrong"})
    }
})


module.exports = router
