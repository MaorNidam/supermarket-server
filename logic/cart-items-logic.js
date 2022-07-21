const cartItemsDal = require('../dal/cart-items-dal');
const cartsLogic = require('./carts-logic');

async function getCartItems(cartId, userId) {
    let isCartVerified = await cartsLogic.validateCartForUser(cartId, userId);
    if (isCartVerified) {
        let cartItems = await cartItemsDal.getCartItems(cartId);
        return cartItems;
    }
    else {
        throw new Error("Invalid cart items request.")
    }
}

async function addCartItem(cartItem, userInfo) {
    let userId = userInfo.userId;
    let isCartVerified = await cartsLogic.validateCartForUser(cartItem.cartId, userId);
    if (isCartVerified) {
        let cartItemId = await cartItemsDal.addCartItem(cartItem);
        return cartItemId;
    }
    else {
        throw new Error("Invalid add request.")
    }
}

async function updateCartItem(cartItem, userInfo) {
    let userId = userInfo.userId;
    let isCartVerified = await cartsLogic.validateCartForUser(cartItem.cartId, userId);
    if (isCartVerified) {
        await cartItemsDal.updateCartItem(cartItem);
    }
    else {
        throw new Error("Invalid update request.")
    }
}

async function deleteCartItem(cartItemId, userId) {
    let isCartItemVerified = await validateCartItemForUser(cartItemId, userId);
    if (isCartItemVerified) {
        await cartItemsDal.deleteCartItem(cartItemId);
    }
    else {
        throw new Error("Invalid delete request.")
    }
}

async function deleteAllItemsFromCart(cartId, userInfo) {
    let userId = userInfo.userId;
    let isCartVerified = await cartsLogic.validateCartForUser(cartId, userId);
    if (isCartVerified) {
        await cartItemsDal.deleteAllItemsFromCart(cartId);
    }
    else {
        throw new Error("Invalid delete request.")
    }
}

async function validateCartItemForUser(cartItemId, userId) {
    let isCartItemVerified = await cartItemsDal.validateCartItemForUser(cartItemId, userId);
    return isCartItemVerified;
}

module.exports = {
    getCartItems,
    addCartItem,
    updateCartItem,
    deleteCartItem,
    deleteAllItemsFromCart
}