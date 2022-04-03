const express = require('express');
const app = express();

const routerProducts = require('./routers/routerProducts');
const routerCart = require('./routers/routerCart');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routerProducts)
app.use('/api/carrito', routerCart)

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Bienvenido a la API de productos',
        status: 200
})
})

app.get('*', (req, res) => {
    res.status(404).json({
        error: -1,
        description: `ruta ${req.baseUrl} no implementada`,
        status: 404
    });
})

module.exports = app;