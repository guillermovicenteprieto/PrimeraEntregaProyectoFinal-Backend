const express = require('express');
const app = express();
const routerProducts = require('./routers/routerProducts');
const routerCart = require('./routers/routerCart');

// const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router base '/api/productos
app.use('/api/productos', routerProducts)
//router base '/api/carrito
app.use('/api/carrito', routerCart)

// app.get('*', (req, res) => {
//     res.send('<h1>Página no encontrada</h1>')
// })

// app.listen(PORT, () => {
//     console.log(`server listening and running on Port: ${PORT} http://localhost:${PORT}`)
// })

module.exports = app;