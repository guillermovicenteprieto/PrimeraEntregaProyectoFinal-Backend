const express = require('express')
const routerCart = express.Router();

const Cart = require('../api/CartClass')
const storeCart = new Cart()

routerCart.get('/', (req, res) => {
    if (storeCart.getAll().length > 0) {
        res.send(storeCart.allCarts)
    } else {
        res.send('No hay productos en el Carrito!')
    }
})

//POST: '/' - Crea un carrito y devuelve su id.
routerCart.post('/', (req, res) => {
    const cart = req.body
    const newCart = storeCart.saveCart(cart)
    const idCart = newCart.id
    res.send(newCart, idCart)
})

//DELETE: '/:id' - Vacía un carrito y lo elimina.
routerCart.delete('/:id', (req, res) => {
    const id = req.params.id
    const cart = storeCart.deleteCart(id)
    res.send(cart)
})

//GET: '/:id/productos' - listar todos los productos guardados en el carrito
routerCart.get('/:id/productos', (req, res) => {
    const id = req.params.id
    if (storeCart.getById(id)) {
        res.send(storeCart.getById(id))
    } else {
        res.send('No hay productos en el Carrito')
    }
})

//POST: '/:id/productos' - incorporar productos al carrito por su id de producto
routerCart.post('/:id/productos', (req, res) => {
    const id = req.params.id
    const product = req.body
    const newProduct = storeCart.saveProduct(id, product)
    res.send(newProduct)
})

//DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
routerCart.delete('/:id/productos/:id_prod', (req, res) => {
    const id = req.params.id
    const id_prod = req.params.id_prod  
    const product = storeCart.deleteProduct(id, id_prod)
    res.send(product)
})

module.exports = routerCart