const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
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
        required: true,
    }

});

const mentorModel = mongoose.model("users", mentorSchema);
module.exports = mentorModel;