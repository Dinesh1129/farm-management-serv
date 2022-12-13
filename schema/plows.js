const mongoose = require('mongoose')

const PlowsSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registrations'
    },
    name:{
        type: String,
        required:true
    },
    type:{
        type:String
    }
})

module.exports = mongoose.model("Plows",PlowsSchema)