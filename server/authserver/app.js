const express = require('express')
const cors = require('cors')

require('dotenv').config()
const connectMongoose = require('./config/mongoose')

const app = express();

// Middleware
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Routes
app.use('/api/auth', require('./routes/auth.js'))

const PORT = process.env.PORT

app.listen(PORT, async() => {
    await connectMongoose()
    console.log(`Server running on port ${PORT}`)
})