const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("Welcome to Payments route")
})


module.exports = router
