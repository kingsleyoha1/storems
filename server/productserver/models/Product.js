const mongoose = require('mongoose')

const ProdSchema = new mongoose.Schema({
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
    qtyAvailable: {
        type: Number,
    },
}, { 
    timestamps: true,
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    } 
})

const Product = mongoose.model('Product', ProdSchema)

module.exports = Product