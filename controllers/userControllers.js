const User = require('../modals/userModel');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
           return res.status(200).send({
                message : "You alread register, now login",
                status : false,
            });
        }

        // Hashing / encription
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({name, email, password : hashedPassword});
        await newUser.save();
        res.status(200).send({
            message : "welcome",
            status : true,
            newUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message : "Error while creating the user",
            status : false,
        })
    }
}