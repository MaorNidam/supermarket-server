const express = require('express');
const router = express.Router();
const cartItemsLogic = require('../logic/cart-items-logic');
const tokenDecoder = require("../utils/token-decoder");

// Method: GET
// url: /cart-item/:cartId
//getCartItems()
router.get("/:cartId", async (request, response) => {
    try {
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        let cartId = request.params.cartId;
        let cart = await cartItemsLogic.getCartItems(cartId, userInfo);
        
        response.json(cart);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// Method: POST
// url: /cart-item/
//addCartItem()
router.post("/", async (request, response) => {
    try {
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        let cartItem = request.body;
        let cartItemId = await cartItemsLogic.addCartItem(cartItem, userInfo);
        
        response.json(cartItemId);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// Method: PUT
// url: /cart-item/
//updateCartItem()
router.put("/", async (request, response) => {
    try {
        let cartItem = request.body;
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        await cartItemsLogic.updateCartItem(cartItem, userInfo);
        
        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// Method: delete
// url: /cart-items/:cartItemId
//deleteCartItem()
router.delete("/:cartItemId", async (request, response) => {
    try {
        let cartItemId = request.params.cartItemId;
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        await cartItemsLogic.deleteCartItem(cartItemId, userInfo);
        
        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// Method: DELETE
// url: /cart-items/by-cart/:cartId
//deleteAllItemsFromCart(cartId)
router.delete("/by-cart/:cartId", async (request, response) => {
    try {
        let cartId = request.params.cartId;
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        await cartItemsLogic.deleteAllItemsFromCart(cartId, userInfo);
        
        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});



module.exports = router;