const ordersDal = require('../dal/orders-dal');
const cartsLogic = require('./carts-logic');
const cartItemsLogic = require('./cart-items-logic');
const fs = require('fs/promises');

async function getLastOrderDate(userId) {
    let lastOrderDate = await ordersDal.getLastOrderDate(userId);
    return lastOrderDate;
}

async function getReceipt(cartId, userId) {
    let isCartBelongToUser = await cartsLogic.validateCartForUser(cartId, userId);
    if (isCartBelongToUser) {
        let receiptName = cartId + '.txt';
        return receiptName;
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
    await createReceipt(orderRequest);
}

async function createReceipt(orderRequest) {
    cartId = orderRequest.cartId;
    let receipt = 'Receipt No. ' + cartId;
    let cartItemsArray = await cartItemsLogic.getCartItems(orderRequest.cartId);
    for (let cartItem of cartItemsArray) {
        receipt += `
    ${cartItem.productName} X ${cartItem.quantity}
_______________________________________________`
    }
    receipt += `
Total: ₪${orderRequest.finalPrice}
Payment: ${orderRequest.paymentLastDigits}`

    await fs.writeFile('./receipts/' + cartId + '.txt', receipt);

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