let connection =require("./connection-wrapper");

async function getAllProducts() {
    let sql = `SELECT p.id, p.name, p.price, p.img_url as imgUrl, p.category_id as categoryId, c.name as categoryName 
    FROM products p join categories c 
    on p.category_id = c.id
    order by p.name;`;
    let products = await connection.execute(sql);
    return products;
}

async function getAllProductsFromCategory(categoryId) {
    let sql = `SELECT p.id, p.name, p.price, p.img_url as imgUrl, p.category_id as categoryId, c.name as categoryName 
    FROM products p join categories c 
    on p.category_id = c.id 
    where c.id = ?
    order by p.name`;
    parameters = [categoryId]
    let products = await connection.executeWithParameters(sql, parameters);
    return products;
}

async function searchProduct(searchString) {
    let sql = `SELECT p.id, p.name, p.price, p.img_url as imgUrl, p.category_id as categoryId, c.name as categoryName 
    FROM products p join categories c 
    on p.category_id = c.id 
    where p.name like "%${searchString}%"`;
    let products = await connection.execute(sql);
    return products;
}

async function addProduct(product) {
    let sql = `INSERT INTO products (name, price, img_url, category_id)  values(?, ?, ?, ?)`;
    let parameters = [product.name, product.price, product.imgUrl, product.categoryId];
    let response = await connection.executeWithParameters(sql, parameters);
    return response.insertId;
}

async function editProduct(product) {
    let sql = `UPDATE products SET name = ?, price = ?, img_url = ?, category_id = ? WHERE id = ?;`;
    let parameters = [product.name, product.price, product.imgUrl, product.categoryId, product.id];
    await connection.executeWithParameters(sql, parameters);
}


module.exports = {
    getAllProducts,
    getAllProductsFromCategory,
    searchProduct,
    addProduct,
    editProduct,
}