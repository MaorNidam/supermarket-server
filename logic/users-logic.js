const usersDal = require("../dal/users-dal");
const cartsLogic = require("../logic/carts-logic")
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const isEmailValid = require("is-valid-email");

async function addUser(user) {
    validateUserData(user);
    if (await usersDal.isUserExist(user.id, user.email)) {
        // throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
        throw new Error("Id or E-mail already exist.");
    }
    user.password = hashPassword(user.password);
    user.role = "user";
    await usersDal.addUser(user);
}

async function loginUser(userLogin) {
    userLogin.password = hashPassword(userLogin.password);
    let userDetails = await usersDal.loginUser(userLogin);
    if (!userDetails) {
        throw new Error("Invalid e-mail or password.");
    }
    
    let userId = userDetails.id;
    let userCart = await cartsLogic.getLastCart(userId)


    let tokenInfo = { userId, role: userDetails.role }
    const token = jwt.sign(tokenInfo, config.secret);
    let loginResponse = { token: token, firstName: userDetails.firstName, lastName: userDetails.lastName,
                          city: userDetails.city, street: userDetails.street , userCart };

    return loginResponse;
}

async function isUserExist(userId, email) {
    let isUserExist = await usersDal.isUserExist(userId, email);
    return isUserExist;
}

function hashPassword(password) {
    const saltRight = "sdkjfhdskajh";
    const saltLeft = "--mnlcfs;@!$ ";
    let hashedPassword = crypto.createHash("md5").update(saltLeft + password + saltRight).digest("hex");
    return hashedPassword;
}

function validateUserData(user) {
    if (user.email === "") {
        throw new Error("Please enter your E-mail.");
    }
    else {
        if (!isEmailValid(user.email)) {
            throw new Error("Invalid E-mail.");
        }
    }

    if (user.firstName === "") {
        throw new Error("Please enter your first name.");
    }

    //allows only letters.
    let format = /[^a-zA-Z]/g;
    if (format.test(user.firstName)) {
        throw new Error("Invalid first name.");
    }

    if (user.lastName === "") {
        throw new Error("Please enter your last name.");
    }

    //allows only letters.
    if (format.test(user.lastName)) {
        throw new Error("Invalid last name.");
    }

    if (user.password.length < 6 || user.password.length > 12) {
        throw new Error("Password needs to be between 6 to 12 characters.");
    }

    let idFormat = /[^0-9]/g;
    if (user.id.length != 9 || idFormat.test(user.id) ) {
        throw new Error("Invalid Id.");
    }

}

module.exports = {
    addUser,
    loginUser,
    isUserExist
}