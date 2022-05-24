const express = require("express");
const router = express.Router();

const vacationsLogic = require('../logic/products-logic');
const likesLogic = require('../logic/carts-logic');

// Method: GET
// url: /vacations/
//getAllVacations()
router.get("/", async (request, response) => {
    try {
        let vacations = await vacationsLogic.getAllVacations();

        response.json(vacations);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// ADD Vacation
// POST http://localhost:3000/vacations
// router.post("/vacations", async (request, response, next) => {
router.post("/", async (request, response) => {
    try {
        let vacation = request.body;
        let id = await vacationsLogic.addVacation(vacation);

        response.json(id);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// EDIT Vacation
// PUT http://localhost:3000/vacations
// router.post("/vacations", async (request, response, next) => {
router.put("/", async (request, response) => {
    try {
        let vacation = request.body;
        let id = await vacationsLogic.editVacation(vacation);

        response.json(id);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

// DELETE Vacation
// PUT http://localhost:3000/vacations
// router.delete("/vacations", async (request, response, next) => {
router.delete("/:id", async (request, response) => {
    try {
        let vacationId = request.params.id;
        await likesLogic.deleteVacationLikes(vacationId);
        await vacationsLogic.deleteVacation(vacationId);

        response.json(vacationId);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router;