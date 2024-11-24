const express = require('express');
const router = express.Router();
const productoRoutes = require('./product.routes');
const categoriaRoutes = require('./categoria.routes');

router.use('/producto', productoRoutes);
router.use('/categorias', categoriaRoutes);

module.exports = router;
