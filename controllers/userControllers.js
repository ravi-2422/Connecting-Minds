const User = require('../modals/userModel');
const Mentor = require('../modals/mentorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// api for signin

exports.loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
           return res.status(200).send({
                message : "You have not any account , register first",
                status : false,
            });
        }

         // varifying the user
        const ispasswordCorrect = await bcrypt.compare(password,user.password);
        if(!ispasswordCorrect){
            return res.status(200).send({
                message: "Invalid credentials",
                status : false,
            })
        } else {
                const token = jwt.sign({id : user._id}, process.env.JWT_SECRET,{
                expiresIn : process.env.TOKEN_EXPIRY,
            })
            //console.log(token);
            res.status(200).send({
                message : "Signin sucessful",
                status : true,
                token,
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message : "Error while signing",
            status : false,
        })
    }
}

// api for user info

exports.userInfo = async (req,res)=>{
    try {
        const {userId} = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.status(200).send({
                message : "User not found",
                status : false,
            }) 
        } else {
            res.status(200).send({
                message : "user found",
                status : true,
                user,
            })
        }      
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : "something went wrong !",
            status : false,
        })
    }
}

// apply for mentor

exports.applyforMentor = async (req, res)=>{
    try {
        const newMentor = new Mentor({ ...req.body });
        const email = req.body.email;
        const existingMentor = await Mentor.findOne({email});
        if(existingMentor){
            return res.status(200).send({
                message : "Already applied",
                status : false,
            })
        }
        await newMentor.save();
        res.status(200).send({
            message : "now become mentor",
            status : "true",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : "something went wrong on apply for mentor !",
            status : false,
        })
    }
}


// update 