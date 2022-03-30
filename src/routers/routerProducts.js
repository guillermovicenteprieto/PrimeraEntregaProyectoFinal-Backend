const express = require('express')
const routerProducts = express.Router();

const Products = require('../api/ProductClass')
const storeProducts = new Products()

const admin = true

routerProducts.get('/', (req, res) => {
    if (storeProducts.allProducts.length > 0) {
        res.send(storeProducts.allProducts)
    } else {
        res.send('No hay productos')
    }
})

//GET: '/:id?' -  Obtener producto por su id 
//(disponible para usuarios y administradores)
routerProducts.get('/:id', (req, res) => {
    const id = req.params.id
    if (storeProducts.getById(id)) {
        res.send(storeProducts.getById(id))
    } else {
        res.send('No hay productos con éste ID')
    }
})

//POST: '/' - Incorporar productos al listado 
//(disponible para administradores)
routerProducts.post('/', (req, res) => {
    if (admin) {
    // const product = req.body
    // console.log(product)
    const newProduct = storeProducts.saveProduct(req.body)
    console.log(newProduct)
    res.send(newProduct)
    } else {
        res.send('No tiene permisos para realizar esta acción')
    }
})

//PUT: '/:id' - Actualizar un producto por su id 
//(disponible para administradores)
routerProducts.put('/:id', (req, res) => {
    if (admin) {
        const id = req.params.id
        console.log(id)
        const product = req.body
        console.log(product)
        const newProduct = storeProducts.updateProduct(id, product)
        console.log(newProduct)
        res.send(newProduct)
    } else {
        res.send('No tiene permisos para realizar esta acción')
    }
})

//DELETE: '/:id' - Borrar un producto por su id (disponible para administradores)
routerProducts.delete('/:id', (req, res) => {
    if (admin) {
        const id = req.params.id
        console.log("aquí id " + id)
        const product = storeProducts.deleteProduct(id)
        console.log("aquí product" + product)
        res.send(product)
    } else {
        res.send('No tiene permisos para realizar esta acción')
    }
})

module.exports = routerProducts
