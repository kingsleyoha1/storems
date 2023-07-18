const mongoose = require('mongoose')

require('dotenv').config()

const dbConfig = {
    productDBUrl: process.env.PRODUCT_DB,
    orderDBUrl: process.env.ORDER_DB,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}

const productConn = mongoose.createConnection(dbConfig.productDBUrl, dbConfig.options)
const orderConn = mongoose.createConnection(dbConfig.orderDBUrl, dbConfig.options)


const schema = {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'regular'],
        default: 'regular'
    },
}

const UserSchema = new mongoose.Schema(schema)

const ProdUser = productConn.model('User', UserSchema)
const OrdUser = orderConn.model('User', UserSchema)

module.exports = { ProdUser, OrdUser }