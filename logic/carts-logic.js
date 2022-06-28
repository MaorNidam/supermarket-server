const cartsDal = require('../dal/carts-dal');

async function getLastCart(userId) {
    let lastCart = await cartsDal.getLastCart(userId);
    if (lastCart){
        lastCart.isOpen = !!lastCart.isOpen;
    }
    return lastCart;
}

async function openCart(userInfo) {
    let role = userInfo.role;
    if (role != "user") {
        throw new Error("Invalid open cart request.");
    }
    let newCartRequest = {
        userId : userInfo.userId,
        isOpen: true,
        creationDate: new Date()
    }
    let cartId = await cartsDal.openCart(newCartRequest);
    let openedCart = {
        id : cartId,
        isOpen: true,
        creationDate: newCartRequest.creationDate
    }
    return openedCart;
}

async function closeCart(cartId) {
    await cartsDal.closeCart(cartId);
}

async function validateCartForUser(cartId, userId) {
    let isCartBelongToUser = await cartsDal.validateCartForUser(cartId, userId);
    return isCartBelongToUser;
}

module.exports = {
    getLastCart,
    openCart,
    closeCart,
    validateCartForUser
}