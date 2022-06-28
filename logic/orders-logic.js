const ordersDal = require('../dal/orders-dal');
const cartsLogic = require('./carts-logic');

async function getLastOrderDate(userId) {
    let lastOrderDate = await ordersDal.getLastOrderDate(userId);
    return lastOrderDate;
}

async function getReceipt(cartId, userId) {
    let isCartBelongToUser = await cartsLogic.validateCartForUser(cartId, userId);
    if (isCartBelongToUser) {
        let receipt = await ordersDal.getReceipt(cartId);
        return receipt;
    }
    else {
        throw new Error("Invalid receipt request.");
    }
}

async function getOrdersAmount() {
    let amountOfOrders = await ordersDal.getOrdersAmount();
    return amountOfOrders;
}

async function getBusyDays() {
    let busyDays = await ordersDal.getBusyDays();
    let busyDaysArray = [];
    for (let day of busyDays) {
        busyDaysArray.push(day.busyDay)
    }
    return busyDaysArray;
}

async function addOrder(orderRequest) {
    await validateOrderRequest(orderRequest);
    await ordersDal.addOrder(orderRequest);
    await cartsLogic.closeCart(orderRequest.cartId);
}

async function validateOrderRequest(orderRequest) {
    let isCartBelongToUser = await cartsLogic.validateCartForUser(orderRequest.cartId, orderRequest.userId);
    if (!isCartBelongToUser) {
        throw new Error("Invalid order request.");
    }

    if (orderRequest.finalPrice <= 0) {
        throw new Error("Invalid final price.");
    }

    if (orderRequest.shippingCity.length > 100) {
        throw new Error("Shipping city is limited to 100 characters.");
    }

    if (orderRequest.shippingStreet.length > 100) {
        throw new Error("Shipping street is limited to 100 characters.");
    }

    if (orderRequest.shippingDate < orderRequest.orderDate) {
        throw new Error("Invalid shipping date.");
    }

    if (orderRequest.finalPrice <= 0) {
        throw new Error("Invalid final price.");
    }

    if (orderRequest.paymentLastDigits.length != 4) {
        throw new Error("Invalid last payment digits.");
    }
}

module.exports = {
    getLastOrderDate,
    getReceipt,
    getOrdersAmount,
    getBusyDays,
    addOrder
}