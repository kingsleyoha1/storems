const Product = require('../models/Product')
const fs = require('fs')
const path = require('path')

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

        // console.log(uploadPath)
        
        // Upload File
        try {
            if(req.files) {
    
                const file = req.files.files;
                const filename = '_' + new Date().getTime().toString() + file.name
        
                const uploadPath = path.join(__dirname, '../uploads/', filename)
                
                file.mv(uploadPath, async(err) => {
                    if (err) {
                      console.error('Error uploading file:', err);
                      return res.status(500).json({ message: 'Failed to upload file' });
                    }
                
                    const data = await Product.create({...req.body, image: filename});
        
                    // // broadcast to users
                    // producer.sendMessage('Product', {method: 'create', data})
        
                    res.json(data)
                });
            }
            else {
                const data = await Product.create({...req.body});
    
                // // broadcast to users
                // producer.sendMessage('Product', {method: 'create', data})
    
                res.json(data)
            }
        } catch(err) {
            console.log("err",err)
            res.status(500).send('Unable to add product');
        }
    },
}