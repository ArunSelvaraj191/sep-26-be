const router = require("express").Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt")

router.post("/login", async (req, res) => {
    try {
        console.log("Login body param =>", req.body)
        const { email, password } = req.body;
        const userExist = await User.find({ email });
        console.log("userExist =>", userExist[0].password)
        if (userExist.length == 0) {
            return res.status(401).json({ message: "Email not valid" })
        } else {

            const decodePassword = await bcrypt.compare(password, userExist[0].password)
            console.log("decodePassword =>", decodePassword);
            if (!decodePassword) {
                return res.status(401).json({ message: "Email not valid" })
            }else{
                const data = {
                    username : userExist[0].username,
                    email : userExist[0].email
                }
                res.json({message : "Login successfully", user : data})
            }
        }

    } catch (error) {

        res.status(500).json({ message: "Something went wrong" })
    }
})

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.find({ email });
        if (userExist.length != 0) {
            return res.status(200).json({ message: "User already exist" })
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const payload = { ...req.body, password: hashPassword }
            const newUser = await User.create(payload);
            return res.status(201).json({ message: "User created successfully", user: newUser })
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
})


module.exports = router
