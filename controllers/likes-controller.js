const express = require("express");
const router = express.Router();
const tokenDecoder = require("../utils/token-decoder");

const likesLogic = require('../logic/likes-logic');

// ADD LIKE
// POST http://localhost:3000/likes
// router.post("/", async (request, response, next) => {
router.post("/", async (request, response) => {
    try {
        let vacationId = request.body.vacationId;

        let tokenInfo = tokenDecoder.decodeTokenFromRequest(request);
        
        let likeRequest = {tokenInfo , vacationId};
        await likesLogic.addLike(likeRequest);

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
        await likesLogic.deleteLike(likeRequest);

        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// Method: GET
// url: /likes/
//getUserLikes()
router.get("/", async (request, response) => {
    try {
        let tokenInfo = tokenDecoder.decodeTokenFromRequest(request);
        let userLikes = await likesLogic.getUserLikes(tokenInfo.userId);
        
        response.json(userLikes);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});


module.exports = router;