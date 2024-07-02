const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

router.get('/', productController.getAllProducts);
router.get('/type/:site_type', productController.getProductsByType); // Nueva ruta para filtrar por tipo de sitio
router.post('/', auth, productController.createProduct);

router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
