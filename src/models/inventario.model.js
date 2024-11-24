const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Producto = require('./producto.model');

const InventarioMovimiento = sequelize.define('InventarioMovimiento', {
  movimiento_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  producto_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipo_movimiento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'inventario_movimiento',
  timestamps: false
});

InventarioMovimiento.belongsTo(Producto, { foreignKey: 'producto_id' });

module.exports = InventarioMovimiento;