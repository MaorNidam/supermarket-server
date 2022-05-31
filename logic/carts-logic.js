const cartsDal = require('../dal/carts-dal');
const cartItemsDal = require('../dal/cart-items-dal');

async function getLastCart(userInfo) {
    let userId = userInfo.userId;
    let lastCart = await cartsDal.getLastCart(userId);
    return lastCart;
}

async function openCart(userInfo) {
    let role = userInfo.role;
    console.log(userInfo)
    if (role != "user") {
        throw new Error("Invalid open cart request.");
    }
    let newCart = {
        userId : userInfo.userId,
        isOpen: true,
        creationDate: new Date()
    }
    let cartId = await cartsDal.openCart(newCart);
    return cartId;
}

async function validateCartForUser(cartId, userId) {
    let isCartBelongToUser = await cartsDal.validateCartForUser(cartId, userId);
    return isCartBelongToUser;
}

module.exports = {
    getLastCart,
    openCart,
    validateCartForUser
}