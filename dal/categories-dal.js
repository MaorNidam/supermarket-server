let connection = require("./connection-wrapper");

async function getAllCategories() {
    let sql = "SELECT name from categories";
    let categories = await connection.execute(sql);
    return categories;
}

module.exports = {
    getAllCategories
}