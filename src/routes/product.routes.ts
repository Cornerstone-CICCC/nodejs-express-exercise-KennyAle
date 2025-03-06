import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { Products } from '../types/product'

const productRouter = Router()

const products: Products[] = [
    { id: '1234', product_name: "Example", product_description: "Desc example", product_price: 17 },
    { id: '12345', product_name: "Example 2", product_description: "Desc example 2", product_price: 17 }
]

// Get All Products
productRouter.get("/products", (req: Request, res: Response) => {
    res.status(200).json(products)
})

// Add Product
productRouter.post("/products", (req: Request<{}, {}, Omit<Products, 'id'>>, res: Response) => {
    const newProduct: Products = {
        id: uuidv4(),
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price
    }
    products.push(newProduct)
    res.status(201).json(newProduct)
})

// Get Product By Id
productRouter.get("/products/:id", (req: Request, res: Response) => {
    const { id } = req.params
    const productFound = products.find(product => product.id === id)
    if (!productFound) {
        res.status(404).send("Product not found")
        return
    }
    res.status(200).json(productFound)
})

// Update Product By Id
productRouter.put("/products/:id", (req: Request<{ id: string }, {}, Partial<Products>>, res: Response) => {
    const { id } = req.params
    const productFound = products.findIndex(product => product.id === id)
    if (productFound === -1) {
        res.status(404).send("Product not found")
        return
    }
    const updateProduct: Products = {
        ...products[productFound],
        product_name: req.body.product_name ?? products[productFound].product_name,
        product_description: req.body.product_description ?? products[productFound].product_description,
        product_price: req.body.product_price ?? products[productFound].product_price
    }
    products[productFound] = updateProduct
    res.status(200).json(updateProduct)
})

// Delete Product By Id
productRouter.delete("/products/:id", (req: Request, res: Response) => {
    const { id } = req.params
    const productFound = products.findIndex(product => product.id === id)
    if (productFound === -1) {
        res.status(404).send("Product not found")
        return
    }
    products.splice(productFound, 1)
    res.status(200).send("Product deleted successfully")
})

export default productRouter