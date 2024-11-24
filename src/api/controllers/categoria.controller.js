class CategoriaController {
    constructor(categoriaService) {
      this.categoriaService = categoriaService;
    }
  
    async createCategoria(req, res) {
      try {
        const categoria = await this.categoriaService.createCategoria(req.body);
        res.status(201).json({
          status: 'success',
          data: categoria
        });
      } catch (error) {
        res.status(400).json({
          status: 'error',
          message: error.message
        });
      }
    }
  
    async getCategorias(req, res) {
      try {
        const categorias = await this.categoriaService.getAllCategorias();
        res.json({
          status: 'success',
          data: categorias
        });
      } catch (error) {
        res.status(500).json({
          status: 'error',
          message: error.message
        });
      }
    }
  }

  module.exports = CategoriaController;