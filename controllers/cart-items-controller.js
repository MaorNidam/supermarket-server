const express = require('express');
const router = express.Router();
const cartItemsLogic = require('../logic/cart-items-logic');
const tokenDecoder = require("../utils/token-decoder");

// Method: GET
// url: /cart-item/:cartId
//getCartItems()
//Get all the cart items by userId (from token) and cartID (from query).
router.get("/:cartId", async (request, response) => {
    try {
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        let cartId = request.params.cartId;
        let userId = userInfo.userId;
        let cart = await cartItemsLogic.getCartItems(cartId, userId);

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
// add a new item to user's cart. by userId(from token) and cartId(from body)
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
//Update the cart item, by userId (from token) and cartId (from body)
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
//Delete cart item by cart item id(from query)
router.delete("/:cartItemId", async (request, response) => {
    try {
        let cartItemId = request.params.cartItemId;
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        let userId = userInfo.userId;
        await cartItemsLogic.deleteCartItem(cartItemId, userId);

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
// Empty cart by cartId (from query)
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