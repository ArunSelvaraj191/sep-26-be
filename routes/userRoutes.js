const route = require("express").Router();
const User = require("../models/userSchema");

route.get("/", async (req,res) => {
    try{
  const users = await User.find().select("-password -__v");
  console.log("users =>",users)
  return res.json({message : "Users fetched successfully", users : users})
    }catch(error){
        res.status(500).json({message : "Something went wrong"})
    }
})

route.put("/update", async (req,res) => {
    try{
        const { id, username } = req.body;
       const updateUser = await User.findByIdAndUpdate(id, { username }, { new: true });
       return res.json({message : "User updated successfully", user : updateUser})
    }
    catch(error){
        res.status(500).json({message : "Something went wrong"})
    }
})

route.delete("/delete/:id", async (req,res) => {
    try{
        const { id } = req.params;
        console.log("id =>",id)
       const updateUser = await User.findByIdAndDelete(id);
       return res.json({message : "User deleted successfully", user : updateUser})
    }
    catch(error){
        console.log("Error =>",error)
        res.status(500).json({message : "Something went wrong"})
    }
})

module.exports = route