const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./src/api/routes');
const morgan = require('morgan');
const helmet = require('helmet');
const sequelize = require('./src/config/database');
const { PORT } = require('./src/config/environment');
const productRoutes = require('./src/api/routes/product.routes');
const categoriaRoutes = require('./src/api/routes/categoria.routes');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/producto', productRoutes);
app.use('/api/categoria', categoriaRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: 'Router no encontrado'
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Algo salió mal'
    })
})

const starServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: false });

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
            console.log(`Health Check: http://localhost:${PORT}/health`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

};

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received');
    process.exit(0);
});

starServer();
const swaggerFilePath = path.join(__dirname, 'swagger.json');

fs.readFile(swaggerFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo swagger.json:', err);
        return;
    }

    try {
        const swaggerDocument = JSON.parse(data);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    } catch (parseError) {
        console.error('Error al parsear swagger.json:', parseError);
    }
});