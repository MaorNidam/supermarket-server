let connection = require("./connection-wrapper");

async function addUser(user) {
    let sql = "INSERT INTO users (email, password, user_type, first_name, last_name)  values(?, ?, ?, ?, ?)";
    let parameters = [user.email, user.password, user.typeOfUser, user.firstName, user.lastName];
    let response = await connection.executeWithParameters(sql, parameters);
    return response.insertId;
}

async function loginUser(user) {
    let sql = "select id, first_name as firstName, last_name as lastName, user_type as typeOfUser from users where email = ? and password=?";
    let parameters = [user.email, user.password];
    let response = await connection.executeWithParameters(sql, parameters);
    return response[0];
}

async function isUserEmailExist(userEmail) {
    let sql = "select email from users where email = ?";
    let parameters = [userEmail];
    let response = await connection.executeWithParameters(sql, parameters);
    return (response.length > 0);
}

module.exports = {
    addUser,
    loginUser,
    isUserEmailExist
}