const express = require('express')
const routerProducts = express.Router();

const Products = require('../api/ProductClass')
const productManager = new Products()

const admin = true

routerProducts
    .get('/', async (req, res) => {
        try {
            const allProducts = await productManager.getAll()
            res.status(200).json({allProducts})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

    //GET: '/:id' -  Obtener producto por su id 
    //(disponible para usuarios y administradores)
    .get('/:id', async (req, res) => {
        const id = req.params.id
        const product = await productManager.getById(id)
        if (product) {
            res.status(200).json({product})
        } else {
            res.status(200).json('No hay productos con éste id')
        }
    })

    //POST: '/' - Incorporar productos al listado 
    //(disponible para administradores)
    .post('/', async (req, res) => {
        if (admin) {
            const product = req.body
            const newProduct = await productManager.save(product)
            res.status(200).json({newProduct})
        } else {
            res.status(403).json({
                error: -1,
                description: `ruta ${req.baseUrl} no autorizada`,
                status: 403
            });
        }
    })

    //PUT: '/:id' - Actualizar un producto por su id 
    //(disponible para administradores)

    //funciona bien si existe id de producto, si el id no existe se cae el servidor...
    .put('/:id', async (req, res) => {
        if (admin) {
            const id = req.params.id
            const product = req.body
            let updatedProduct = await productManager.update(id, product)
            if (updatedProduct.id) {
                res.status(200).json({updatedProduct})
            } else {
                res.status(200).json('No hay productos con éste id')
            }
        } else {
            res.status(403).json({
                error: -1,
                description: `ruta ${req.baseUrl} no autorizada`,
                status: 403
            });
        }
    })

    //DELETE: '/:id' - Borrar un producto por su id 
    //(disponible para administradores)
    .delete('/:id', async (req, res) => {
        if (admin) {
            const id = req.params.id
            const deletedProduct = await productManager.delete(id)
            res.status(200).json({deletedProduct})
        } else {
            res.status(403).json({
                error: -1,
                description: `ruta ${req.baseUrl} no autorizada`,
                status: 403
            });
        }
    })

module.exports = routerProducts
