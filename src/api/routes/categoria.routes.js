const express = require('express');
const router = express.Router();

const Categoria = require('../../models/categoria.model'); // Importa el modelo
const CategoriaService = require('../../../src/services/categoria.service'); // Importa el servicio
const CategoriaController = require('../controllers/categoria.controller');

// Instancia del servicio y del controlador
const categoriaService = new CategoriaService(Categoria);
const categoriaController = new CategoriaController(categoriaService);

// Define las rutas
router.get('/', categoriaController.getCategorias.bind(categoriaController));
router.post('/', categoriaController.createCategoria.bind(categoriaController));

module.exports = router;
