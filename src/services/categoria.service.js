class CategoriaService {
  constructor(categoriaModel) {
    this.categoriaModel = categoriaModel;
  }

  async createCategoria(data) {
    return await this.categoriaModel.create(data);
  }

  async getAllCategorias() {
    return await this.categoriaModel.findAll();
  }

  async getCategoriaById(id) {
    return await this.categoriaModel.findByPk(id);
  }

  async updateCategoria(id, data) {
    const categoria = await this.categoriaModel.findByPk(id);
    if (!categoria) return null;
    return await categoria.update(data);
  }

  async deleteCategoria(id) {
    const categoria = await this.categoriaModel.findByPk(id);
    if (!categoria) return false;
    await categoria.destroy();
    return true;
  }
}

module.exports = CategoriaService;
