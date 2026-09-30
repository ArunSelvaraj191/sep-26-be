const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("Welcome to Transactions route")
})


module.exports = router
