const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    institution : {
        type : String,
        required : true,
    },
    department : {
        type : String,
        required : true,
    },
    skills : {
        type : String,
        required : true,
    }, 
    timing : {
        type: Array,
    }

});

const mentorModel = mongoose.model("mentors", mentorSchema);
module.exports = mentorModel;