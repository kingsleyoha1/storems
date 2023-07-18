const router = require('express').Router();
const { addProduct, editProduct, deleteProduct, updateProductImage, fetchProducts 
} = require('../controllers/ProductController')
// const {  = require('../middleware/verifyAcess')


router.get('/', (...params) => fetchProducts(...params))
router.post('/', (...params) => addProduct(...params))
router.put('/', (...params) => editProduct(...params))
router.post('/delete', (...params) => deleteProduct(...params))
router.post('/update-image', (...params) => updateProductImage(...params))


module.exports = router;