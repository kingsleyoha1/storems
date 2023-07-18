const mongoose = require('mongoose')

require('dotenv').config()

const dbConfig = {
    authDBUrl: process.env.AUTH_DB,
    orderDBUrl: process.env.ORDER_DB,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}

const authConn = mongoose.createConnection(dbConfig.authDBUrl, dbConfig.options)
const orderConn = mongoose.createConnection(dbConfig.orderDBUrl, dbConfig.options)


const schema = {
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
}

const schemaOptions = {  timestamps: true,
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    } 
}

const ProdSchema = new mongoose.Schema(schema, schemaOptions)

const AuthProduct = authConn.model('Product', ProdSchema)
const OrdProduct = orderConn.model('Product', ProdSchema)

module.exports = { AuthProduct, OrdProduct }