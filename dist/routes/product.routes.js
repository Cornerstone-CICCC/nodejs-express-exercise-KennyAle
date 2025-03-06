"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
const products = [
    { id: '1234', product_name: "Example", product_description: "Desc example", product_price: 17 },
    { id: '12345', product_name: "Example 2", product_description: "Desc example 2", product_price: 17 }
];
// Get All Products
productRouter.get("/products", (req, res) => {
    res.status(200).json(products);
});
// Add Product
productRouter.post("/products", (req, res) => {
    const newProduct = {
        id: (0, uuid_1.v4)(),
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
// Get Product By Id
productRouter.get("/products/:id", (req, res) => {
    const { id } = req.params;
    const productFound = products.find(product => product.id === id);
    if (!productFound) {
        res.status(404).send("Product not found");
        return;
    }
    res.status(200).json(productFound);
});
// Update Product By Id
productRouter.put("/products/:id", (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const productFound = products.findIndex(product => product.id === id);
    if (productFound === -1) {
        res.status(404).send("Product not found");
        return;
    }
    const updateProduct = Object.assign(Object.assign({}, products[productFound]), { product_name: (_a = req.body.product_name) !== null && _a !== void 0 ? _a : products[productFound].product_name, product_description: (_b = req.body.product_description) !== null && _b !== void 0 ? _b : products[productFound].product_description, product_price: (_c = req.body.product_price) !== null && _c !== void 0 ? _c : products[productFound].product_price });
    products[productFound] = updateProduct;
    res.status(200).json(updateProduct);
});
// Delete Product By Id
productRouter.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    const productFound = products.findIndex(product => product.id === id);
    if (productFound === -1) {
        res.status(404).send("Product not found");
        return;
    }
    products.splice(productFound, 1);
    res.status(200).send("Product deleted successfully");
});
exports.default = productRouter;
