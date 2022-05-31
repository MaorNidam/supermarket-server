const connection = require("./connection-wrapper");

async function getLastOrderDate(userId) {
    let sql = `SELECT max(order_date) as orderDate
    FROM supermarket.orders
    where user_id = ? `;
    let parameters = [userId]
    let cart = await connection.executeWithParameters(sql, parameters);
    return cart;
}

async function getReceipt(cartId, userId) {
    return ("FIX THIS!");
}

async function getOrdersAmount() {
    let sql = `SELECT count(id) as amountOfOrders 
    FROM supermarket.orders`;
    let [serverResponse] = await connection.execute(sql);
    return serverResponse.amountOfOrders;
}

async function getBusyDays() {
    let sql = `SELECT shipping_date as busyDay  
    FROM supermarket.orders 
    GROUP BY shipping_date HAVING count(id) >= 3;`;
    let serverResponse = await connection.execute(sql);
    return serverResponse;
}

async function addOrder(orderRequest) {
    let sql = `INSERT INTO orders (user_id, cart_id, final_price, shipping_city, shipping_street, shipping_date, payment_last_digits, order_date)  values(?, ?, ?, ?, ?, ?, ?, ?)`;
    let parameters = [
        orderRequest.userId,
        orderRequest.cartId,
        orderRequest.finalPrice,
        orderRequest.shippingCity,
        orderRequest.shippingStreet,
        orderRequest.shippingDate,
        orderRequest.paymentLastDigits,
        orderRequest.orderDate
    ];
    await connection.executeWithParameters(sql, parameters);
}

module.exports = {
    getLastOrderDate,
    getReceipt,
    getOrdersAmount,
    getBusyDays,
    addOrder
}