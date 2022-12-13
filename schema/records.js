const mongoose = require('mongoose')

const RecordsSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registrations'
    },
    place:{
        type: String,
    },
    driver:{
        type:String,
        required:true
    },
    tractor:{
        type:String,
        required:true
    },
    plow:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    farmer:{
        type:String,
        required:true
    },
    totalhr:{
        type: Number,
        required: true
    },
    totalmin:{
        type: Number,
        required:true
    },
    hourlyrate:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Records",RecordsSchema)