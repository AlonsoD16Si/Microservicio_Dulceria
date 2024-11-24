const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/producto.controller');
const ProductoService = require('../../services/producto.service');
const Producto = require('../../models/producto.model');

const productoService = new ProductoService(Producto);
const productoController = new ProductoController(productoService);

router.get('/', productoController.getProductos.bind(productoController));  
router.post('/', productoController.createProducto.bind(productoController));  
router.get('/:id', productoController.getProductoById.bind(productoController));  
router.put('/:id', productoController.updateProducto.bind(productoController)); 
router.delete('/:id', productoController.deleteProducto.bind(productoController)); 

module.exports = router;
