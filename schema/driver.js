const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registrations'
    },
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
    },
    license:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Drivers",DriverSchema)