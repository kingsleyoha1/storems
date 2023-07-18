const router = require('express').Router();
const { addProduct, editProduct, deleteProduct, updateProductImage, fetchProducts 
} = require('../controllers/ProductController')
const { verifyAdminAccess } = require('../middleware/verifyAcess')


router.get('/', (...params) => fetchProducts(...params))
router.post('/', verifyAdminAccess, (...params) => addProduct(...params))
router.put('/', verifyAdminAccess, (...params) => editProduct(...params))
router.post('/delete', verifyAdminAccess, (...params) => deleteProduct(...params))
router.post('/update-image', verifyAdminAccess, (...params) => updateProductImage(...params))


module.exports = router;