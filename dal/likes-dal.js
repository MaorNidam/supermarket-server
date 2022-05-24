let connection = require("./connection-wrapper");

async function getUserLikes(userId) {
    let sql = "SELECT vacation_id from likes where user_id = ?";
    let parameters = [userId];
    let userLikes = await connection.executeWithParameters(sql, parameters);
    return userLikes;
}

async function deleteVacationLikes(vacationId) {
    let sql = "DELETE FROM `vacations`.`likes` WHERE (`vacation_id` = ?);";
    let parameters = [vacationId];
    await connection.executeWithParameters(sql, parameters);
}

async function addLike(likeRequest) {
    let sql = "INSERT INTO `vacations`.`likes`(user_id ,vacation_id) values(?, ?);";
    let parameters = [likeRequest.tokenInfo.userId, likeRequest.vacationId];
    await connection.executeWithParameters(sql, parameters);
}

async function deleteLike(likeRequest) {
    let sql = "DELETE FROM likes WHERE (user_id = ? and vacation_id = ?);";
    let parameters = [likeRequest.tokenInfo.userId, likeRequest.vacationId];
    await connection.executeWithParameters(sql, parameters);
}

module.exports = {
    getUserLikes,
    deleteVacationLikes,
    addLike,
    deleteLike
}