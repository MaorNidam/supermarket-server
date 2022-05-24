const usersDal = require("../dal/users-dal");
const likesDal = require("../dal/likes-dal")
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const isEmailValid = require("is-valid-email");

async function addUser(user) {
    validateUserData(user);
    if (await usersDal.isUserEmailExist(user.email)) {
        // throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
        throw new Error("Invalid e-mail or password.");
    }
    user.password = hashPassword(user.password);
    user.typeOfUser = "user";
    let newUserId = await usersDal.addUser(user);
    return newUserId;
}

async function loginUser(userLogin) {
    userLogin.password = hashPassword(userLogin.password);
    let userDetails = await usersDal.loginUser(userLogin);
    if (!userDetails) {
        throw new Error("Invalid e-mail or password.");
    }

    let userLikes = await likesDal.getUserLikes(userDetails.id);
    let likesArray = [];
    for (let like of userLikes) {
        likesArray.push(like.vacation_id);
    }

    let tokenInfo = { userId: userDetails.id, typeOfUser: userDetails.typeOfUser }
    const token = jwt.sign(tokenInfo, config.secret);
    let loginResponse = { token: token, firstName: userDetails.firstName, lastName: userDetails.lastName, likesArray: likesArray };

    return loginResponse;
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
        throw new Error("Invalid first name");
    }

    if (user.password.length < 6 || user.password.length > 12) {
        throw new Error("Password needs to be between 6 to 12 charecters.");
    }

    if (user.password !== user.verifyPassword) {
        throw new Error("Password doesn't match.");
      }

}

module.exports = {
    addUser,
    loginUser,
}