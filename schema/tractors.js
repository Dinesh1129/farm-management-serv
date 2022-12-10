const mongoose = require('mongoose')

const TractorSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registrations'
    },
    name:{
        type: String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    size:{
        type:String
    },
    color:{
        type:String
    },
    model:{
        type:String,
    },
    registrationnumber:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Tractors",TractorSchema)