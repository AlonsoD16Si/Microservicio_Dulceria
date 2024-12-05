class ProductoService {
  constructor(model) {
    this.model = model;
  }

 
  async getAll(options = {}) {
    return this.model.findAll(options);  
  }

  async updateProducto(id, productoData) {
    return this.model.update(productoData, {
      where: { producto_id: id }
    });
  }

  async deleteProducto(id) {
    return this.model.destroy({
      where: { producto_id: id }
    });
  }

  async getById(id, options = {}) {
    return this.model.findOne({
      where: { producto_id: id },
      ...options  
    });
  }

  
  async create(productoData) {
    if (!this.model) {
      throw new Error('Producto model is not defined');  
    }

    
    return await this.model.create(productoData);  
  }

  
}

module.exports = ProductoService;
