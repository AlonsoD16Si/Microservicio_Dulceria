const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./categoria.model');

const Producto = sequelize.define('Producto', {
    producto_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_producto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    existencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tamanio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unidad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    categoria_id: {
        type: DataTypes.BIGINT,
        references: {
            model: Categoria,
            key: 'categoria_id'
        }
    },
},
    {
        tableName: 'producto',
        timestamps: false
    });


Producto.belongsTo(Categoria, {
    foreignKey: 'categoria_id',
    as: 'categoria' 
});

module.exports = Producto;
