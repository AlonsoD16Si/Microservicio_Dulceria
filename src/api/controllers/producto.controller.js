const Categoria = require('../../models/categoria.model');

class ProductoController {
  constructor(productoService) {
    this.productoService = productoService;
  }

  // Método para obtener todos los productos con la categoría asociada
  async getProductos(req, res) {
    try {
      const productos = await this.productoService.getAll({
        include: [{
          model: Categoria,
          as: 'categoria'  
        }]
      });
      res.status(200).json({
        status: 'success',
        data: productos
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Error al obtener los productos.'
      });
    }
  }

  // Método para obtener un producto por ID con su categoría asociada
  async getProductoById(req, res) {
    try {
      const producto = await this.productoService.getById(req.params.id, {
        include: [{
          model: Categoria,
          as: 'categoria' 
        }]
      });
      if (!producto) {
        return res.status(404).json({
          status: 'error',
          message: 'Producto no encontrado.'
        });
      }
      res.status(200).json({
        status: 'success',
        data: producto
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Error al obtener el producto.'
      });
    }
  }
  async createProducto(req, res) {
    try {
      
      const { nombre_producto, precio, existencia, tamanio, unidad, estatus, categoria_id } = req.body;

      const productoData = {
        nombre_producto,
        precio,
        existencia,
        tamanio,
        unidad,
        estatus,
        categoria_id 
      };

      const producto = await this.productoService.create(productoData);
      return res.status(201).json(producto);
    } catch (error) {
      return res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
  }


  async updateProducto(req, res) {
    try {
      const producto = await this.productoService.updateProducto(req.params.id, req.body);
      if (!producto) {
        return res.status(404).json({
          status: 'error',
          message: 'Producto no encontrado'
        });
      }
      res.json({
        status: 'success',
        data: producto
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async deleteProducto(req, res) {
    try {
      const result = await this.productoService.deleteProducto(req.params.id);
      if (!result) {
        return res.status(404).json({
          status: 'error',
          message: 'Producto no encontrado'
        });
      }
      res.json({
        status: 'success',
        message: 'Producto eliminado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

module.exports = ProductoController;