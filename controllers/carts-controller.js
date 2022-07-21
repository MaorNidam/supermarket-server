const express = require("express");
const router = express.Router();

const cartLogic = require("../logic/carts-logic");
const tokenDecoder = require("../utils/token-decoder");

// Method: GET
// url: /cart
//getLastCart()
// get user's last cart, by userId (from token).
router.get("/", async (request, response) => {
    try {
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        let cart = await cartLogic.getLastCart(userInfo.userId);

        response.json(cart);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// Method: post
// url: /cart
//openCart()
// Open a new cart for the user, by userId (from token).
router.post("/", async (request, response) => {
    try {
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        let cart = await cartLogic.openCart(userInfo);

        response.json(cart);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router;