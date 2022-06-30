const express = require("express");
const router = express.Router();
const tokenDecoder = require("../utils/token-decoder");
const path = require("path");

const ordersLogic = require('../logic/orders-logic');

// Method: GET
// url: /orders/
//getLastOrderDate()
router.get("/", async (request, response) => {
    try {
        let userInfo = tokenDecoder.decodeTokenFromRequest(request)
        let lastOrderDate = await ordersLogic.getLastOrderDate(userInfo.userId);

        response.json(lastOrderDate);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});


// Method: GET
// url: /orders/amount
//getOrdersAmount()
router.get("/amount/", async (request, response) => {
    try {
        let amountOfOrders = await ordersLogic.getOrdersAmount();
        
        response.json(amountOfOrders);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// Method: GET
// url: /orders/days
//getBusyDays()
router.get("/days", async (request, response) => {
    try {
        let busyDays = await ordersLogic.getBusyDays();
        
        response.json(busyDays);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// Method: GET
// url: /orders/:cartId
//getReceipt()
router.get("/:cartId", async (request, response) => {
    try {
        let cartId = request.params.cartId;
        let userId = tokenDecoder.decodeTokenFromRequest(request).userId;
        let receiptName = await ordersLogic.getReceipt(cartId, userId);

        response.sendFile(path.resolve(__dirname , '../receipts/' , receiptName));
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// ADD ORDER
// POST http://localhost:3000/orders
// router.post("/", async (request, response, next) => {
    router.post("/", async (request, response) => {
        try {
            let orderInfo = request.body;
            
            let userInfo = tokenDecoder.decodeTokenFromRequest(request);
            
        let orderRequest = {
            userId: userInfo.userId,
            cartId: orderInfo.cartId,
            finalPrice: orderInfo.finalPrice,
            shippingCity: orderInfo.shippingCity,
            shippingStreet: orderInfo.shippingStreet,
            shippingDate: new Date(orderInfo.shippingDate),
            paymentLastDigits: orderInfo.paymentLastDigits,
            orderDate: new Date()
        };
        await ordersLogic.addOrder(orderRequest);

        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});


module.exports = router;