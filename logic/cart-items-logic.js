const cartItemsDal = require('../dal/cart-items-dal');
const cartLogic = require('../logic/carts-logic');

async function getCartItems(cartId) {
    let cart = await cartItemsDal.getCartItems(cartId);
    return cart;
}

async function addCartItem(cartItem, userInfo) {
    cartLogic.validateCartForUser(cartItem.cartId, userInfo);
    //validateCartItem(cartItem);
    let cartItemId = await cartItemsDal.addCartItem(cartItem);
    return cartItemId;
}
async function updateCartItem(cartItem, userInfo) {
    //TODO: 
    cartLogic.validateCartForUser(userInfo);
    //validateCartItem(cartItem);
    await cartItemsDal.updateCartItem(cartItem);
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