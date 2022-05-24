let connection =require("./connection-wrapper");

async function getAllVacations() {
    let sql = "SELECT v.id, v.name, v.description, v.price, v.img_url as imgURL, v.start_date as startDate, v.end_date as endDate , count(l.user_id) as amountOfLikes FROM vacations.vacations v left join likes l ON v.id = l.vacation_id group by v.id";
    let vacations = await connection.execute(sql);
    return vacations;
}

async function addVacation(vacation) {
    let sql = "INSERT INTO vacations (name, description, price, img_url, start_date, end_date)  values(?, ?, ?, ?, ?, ?)";
    let parameters = [vacation.name, vacation.description, vacation.price, vacation.imgURL, vacation.startDate, vacation.endDate];
    let response = await connection.executeWithParameters(sql, parameters);
    return response.insertId;
}

async function editVacation(vacation) {
    let sql = "UPDATE vacations SET name = ?, price = ?, start_date = ?, end_date = ?, img_url = ?, description = ? WHERE id = ?;";
    let parameters = [vacation.name, vacation.price, vacation.startDate, vacation.endDate, vacation.imgURL, vacation.description, vacation.id];
    let response = await connection.executeWithParameters(sql, parameters);
    return response.insertId;
}

async function deleteVacation(id) {
    sql = "DELETE FROM `vacations`.`vacations` WHERE (`id` = ?);";
    parameters = [id];
    await connection.executeWithParameters(sql, parameters);
}

module.exports = {
    getAllVacations,
    addVacation,
    editVacation,
    deleteVacation
}