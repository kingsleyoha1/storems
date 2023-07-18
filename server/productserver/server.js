const express = require('express')
const cors = require('cors')
const fileupload = require('express-fileupload')

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
app.use(fileupload({ useTempFiles: true }));
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Routes
app.get('/api/hey', (req, res) => {
    res.send("<h1>Hey Buddy</h1>")
})
app.use('/api/products/images', express.static('uploads'))
app.use('/api/products', require('./routes/products.js'))



const PORT = process.env.PORT

app.listen(PORT, async() => {
    await connectMongoose()
    console.log(`Server running on port ${PORT}`)
})