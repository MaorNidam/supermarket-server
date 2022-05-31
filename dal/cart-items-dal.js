const connection = require('./connection-wrapper');

async function getCartItems(cartId) {
    let sql = `SELECT ci.id, ci.product_id as productId, ci.quantity, p.name as productName, p.price 
    FROM supermarket.cart_items ci join products p
    on ci.product_id = p.id 
    where ci.cart_id = ?; `;
    let parameters = [cartId]
    let cart = await connection.executeWithParameters(sql, parameters);
    return cart;
}

async function addCartItem(cartItem) {
    let sql = `INSERT INTO cart_items ( product_id, cart_id, quantity)  values(?, ?, ?)`;
    let parameters = [cartItem.productId, cartItem.cartId, cartItem.quantity];
    let response = await connection.executeWithParameters(sql, parameters);
    return response.insertId;
}

async function updateCartItem(cartItem) {
    let sql = `UPDATE cart_items SET product_id = ?, cart_id = ?, quantity = ? WHERE id = ?;`;
    let parameters = [cartItem.productId, cartItem.cartId, cartItem.quantity, cartItem.id];
    await connection.executeWithParameters(sql, parameters);
}

async function deleteCartItem(cartItemId) {
    sql = `DELETE FROM cart_items WHERE id = ?;`;
    parameters = [cartItemId];
    await connection.executeWithParameters(sql, parameters);
}

async function deleteAllItemsFromCart(cartId) {
    sql = `DELETE FROM cart_items WHERE cart_id = ?;`;
    parameters = [cartId];
    await connection.executeWithParameters(sql, parameters);
}

module.exports = {
    getCartItems,
    addCartItem,
    updateCartItem,
    deleteCartItem,
    deleteAllItemsFromCart
}