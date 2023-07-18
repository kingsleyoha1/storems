const Product = require('../models/Product')
const Producer = require('../producer')

const producer = new Producer()

module.exports = {
    fetchProducts: async(req, res) => {
        try {
            const data = await Product.find();
            // console.log(data)
            res.json(data)
        } catch(err) {
            res.status(400).send('Unable to fetch products, please try refreshing the request')
        }
    },
    addProduct: async(req, res) => {
        const exists = await Product.findOne({title: req.body.title});
        if(exists) {
            return res.status(400).send('Product title already exists, please try something else')
        }

        try {
            const data = await Product.create({...req.body});

            // PUBLISH PRODUCT-CREATE
            await producer.publishMessage('create', {type: 'create', data})

            res.json(data)

        } catch(err) {
            console.log("err",err)
            res.status(500).send('Unable to add product');
        }
    },
    editProduct: async(req, res) => {
        try {
            await Product.findByIdAndUpdate(req.body._id, req.body)
            res.send('Successfully updated product')
        } catch(err) {
            console.log("err",err)
            res.status(500).send('Error updating product data');
        }
    },

    deleteProduct: async(req, res) => {
        try {
            await Product.findByIdAndDelete(req.body._id);

            res.send('Successfully deleted product data')
        } catch(err) {
            console.log("err",err)
            res.status(500).send('Error deleting product data');
        }
    }


}