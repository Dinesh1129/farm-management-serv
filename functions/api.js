const express = require('express')
const app = express()
const router = express.Router()
require('dotenv').config()
const cors = require('cors')
const connectDB =  require('../config/db')
const serverless = require('serverless-http')
const path = require('path')

app.use(cors())

connectDB()

app.use(express.json())



app.use('/.netlify/functions/api/user/', require('../routes/userAuth'));


app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));



module.exports = app;
module.exports.handler = serverless(app)