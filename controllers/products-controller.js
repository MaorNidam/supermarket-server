const express = require("express");
const router = express.Router();

const productsLogic = require('../logic/products-logic');

// Method: GET
// url: /products/

//getAllProducts()
router.get("/", async (request, response) => {
    try {
        let products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// Method: GET
// url: /products/search/:searchString
//getAllProducts()
router.get("/search/:searchString", async (request, response) => {
    try {
        let products = await productsLogic.searchProduct(request.params.searchString);
        response.json(products);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// Method: GET
// url: /products/:category
//getAllProductsFromCategory()
router.get("/:categoryId", async (request, response) => {
    try {
        let products = await productsLogic.getAllProductsFromCategory(request.params.categoryId);

        response.json(products);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// ADD product
// POST http://localhost:3000/product
router.post("/", async (request, response) => {
    try {
        let product = request.body;
        let productId = await productsLogic.addProduct(product);

        response.json(productId);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// EDIT product
// PUT http://localhost:3000/products
router.put("/", async (request, response) => {
    try {
        let product = request.body;
        let id = await productsLogic.editProduct(product);

        response.json(id);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});


module.exports = router;