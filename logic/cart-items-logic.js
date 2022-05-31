const cartItemsDal = require('../dal/cart-items-dal');
const cartLogic = require('../logic/carts-logic');

async function getCartItems(cartId) {
    let cart = await cartItemsDal.getCartItems(cartId);
    return cart;
}

async function addCartItem(cartItem, userInfo) {
    let userId = userInfo.userId;
    let isCartVerified = await cartLogic.validateCartForUser(cartItem.cartId, userId);
    if (isCartVerified) {
        let cartItemId = await cartItemsDal.addCartItem(cartItem);
        return cartItemId;
    }
    else {
        throw new Error("The server is a teapot.")
    }
}

async function updateCartItem(cartItem, userInfo) {
    let userId = userInfo.userId;
    let isCartVerified = await cartLogic.validateCartForUser(cartItem.cartId, userId);
    if (isCartVerified) {
        await cartItemsDal.updateCartItem(cartItem);
    }
    else {
        throw new Error("The server is a teapot.")
    }
}

async function deleteCartItem(cartItemId) {
    await cartItemsDal.deleteCartItem(cartItemId);
}

async function deleteAllItemsFromCart(cartId) {
    await cartItemsDal.deleteAllItemsFromCart(cartId);
}

module.exports = {
    getCartItems,
    addCartItem,
    updateCartItem,
    deleteCartItem,
    deleteAllItemsFromCart
}