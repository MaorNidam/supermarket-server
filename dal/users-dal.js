let connection = require("./connection-wrapper");

async function addUser(user) {
    let sql = "INSERT INTO users (id, email, password, is_admin, first_name, last_name, city, street)  values(?, ?, ?, ?, ?, ?, ?, ?)";
    let parameters = [user.id, user.email, user.password, user.isAdmin, user.firstName, user.lastName, user.city, user.street];
    await connection.executeWithParameters(sql, parameters);
}

async function loginUser(user) {
    let sql = "select id, first_name as firstName, last_name as lastName, is_admin as isAdmin, city, street from users where email = ? and password=?";
    let parameters = [user.email, user.password];
    let response = await connection.executeWithParameters(sql, parameters);
    return response[0];
}

async function isUserExist(userId, userEmail) {
    let sql = "select id from users where (id = ? or email = ?) ";
    let parameters = [userId, userEmail];
    let response = await connection.executeWithParameters(sql, parameters);
    return (response.length > 0);
}

module.exports = {
    addUser,
    loginUser,
    isUserExist
}