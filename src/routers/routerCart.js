const express = require('express')
const routerCart = express.Router();

const Cart = require('../api/CartClass')
const cartManager = new Cart()

routerCart
    //GET: '/' -  Obtener todos los productos del carrito
    .get('/', async (req, res) => {
        try {
            const cart = await cartManager.cartList()
            res.status(200).json({cart})
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })

    //POST: '/' - Crea un carrito y devuelve su id.
    .post('/', async (req, res) => {
        try {
            const productAdded = await cartManager.addtoCart(req.body)
            res.status(200).json({productAdded})
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })


    //DELETE: '/:id' - Vacía un carrito y lo elimina.
    .delete('/:id', async (req, res) => {
        try {
            id = req.params.id
            const productDeleted = await cartManager.deleteCart(id)
            res.status(200).json({productDeleted})
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })

    //GET: '/:id/productos' - listar todos los productos guardados en el carrito
    .get('/:id/productos', async (req, res) => {
        try {
            id = req.params.id
            const productList = await cartManager.getProducts(id)
            res.status(200).json({productList})
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })

    //DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
    .delete('/:id/productos/:id_prod', async (req, res) => {
        try {
            id = req.params.id
            id_prod = req.params.id_prod
            const productDeleted = await cartManager.deleteProduct(id, id_prod)
            res.status(200).json({productDeleted})
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })


    // //POST: '/:id/productos' - incorporar productos al carrito por su id de producto
    // post('/:id/productos', (req, res) => {
    //     const id = req.params.id
        //     const product = req.body
    //     const newProduct = cartManager.saveProduct(id, product)
    //     res.send(newProduct)
    // })

module.exports = routerCart