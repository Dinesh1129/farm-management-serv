const mongoose = require('mongoose')

const FarmsSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registrations'
    },
    farmername:{
        type: String,
        required:true
    },
    place:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Farms",FarmsSchema)