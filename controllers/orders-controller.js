const express = require("express");
const router = express.Router();
// const tokenDecoder = require("../utils/token-decoder");

const ordersLogic = require('../logic/orders-logic');

// ADD LIKE
// POST http://localhost:3000/likes
// router.post("/", async (request, response, next) => {
router.post("/", async (request, response) => {
    try {
        let vacationId = request.body.vacationId;

        let tokenInfo = tokenDecoder.decodeTokenFromRequest(request);
        
        let likeRequest = {tokenInfo , vacationId};
        await ordersLogic.addLike(likeRequest);

        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// DELETE LIKE
// DELETE http://localhost:3000/likes
// router.post("/", async (request, response, next) => {
router.delete("/:id", async (request, response) => {
    try {
        let vacationId = request.params.id;

        let tokenInfo = tokenDecoder.decodeTokenFromRequest(request);
        
        let likeRequest = {tokenInfo , vacationId};
        await ordersLogic.deleteLike(likeRequest);

        response.json();
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
router.get("/days/", async (request, response) => {
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
//getRecipt()
router.get("/:cartId", async (request, response) => {
    try {
        let busyDays = await ordersLogic.getBusyDays();
        
        response.json(busyDays);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});


module.exports = router;