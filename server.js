const express = require('express')
const app = express()
const router = express.Router()
const PORT = process.env.PORT || 5000;
require('dotenv').config()
const cors = require('cors')
const connectDB =  require('./config/db')
const {handler} = require('./functions/api')

connectDB()

app.use(express.json())

app.use(router)

// app.use('/.netlify/functions/api/',handler)

app.use(cors())

app.listen(PORT,() => console.log(`server started on PORT`))