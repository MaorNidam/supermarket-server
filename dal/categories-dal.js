let connection = require("./connection-wrapper");

async function getAllCategories() {
    let sql = "SELECT id, name from categories order by name";
    let categories = await connection.execute(sql);
    return categories;
}

module.exports = {
    getAllCategories
}