const { DataTypes } = require('sequelize');
const sequelize = require('../../src/config/database');

const Categoria = sequelize.define('Categoria', {
  categoria_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categoria',
  timestamps: false
});

module.exports = Categoria;
