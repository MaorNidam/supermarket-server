const express = require("express");
const router = express.Router();

const usersLogic = require('../logic/users-logic');

// ADD USER
// POST http://localhost:3000/users/
// router.post("/users/", async (request, response, next) => {
router.post("/", async (request, response) => {
    try {
        let userDetails = request.body;
        await usersLogic.addUser(userDetails);
        
        response.json();
    }
    catch(e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// login USER
// POST http://localhost:3000/users/login
// router.post("/users/login/", async (request, response, next) => {
router.post("/login", async (request, response) => {
    try {
        let userLogIn = request.body;
        let loginResponse = await usersLogic.loginUser(userLogIn);
        
        response.json(loginResponse);
    }
    catch(e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// verify USER
// POST http://localhost:3000/users/isExist
// router.post("/users/login/", async (request, response, next) => {
router.post("/isExist", async (request, response) => {
    try {
        let userId = request.body.userId;
        let email = request.body.email;
        let loginResponse = await usersLogic.isUserExist(userId, email);
        
        response.json(loginResponse);
    }
    catch(e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});



module.exports = router;