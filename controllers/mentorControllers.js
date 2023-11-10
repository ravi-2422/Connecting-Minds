const User = require('../modals/userModel');
const Mentor = require('../modals/mentorModel');

exports.mentorInfo = async (req,res)=>{
    try {
        const {mentorId} = req.body;
        const mentor = await Mentor.findById(mentorId);
        if(!mentor){
            return res.status(200).send({
                message : "mentor not found",
                status : false,
            }) 
        } else {
            res.status(200).send({
                message : "mentor found",
                status : true,
                mentor,
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


