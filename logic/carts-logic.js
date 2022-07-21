const cartsDal = require('../dal/carts-dal');

async function getLastCart(userId) {
    let lastCart = await cartsDal.getLastCart(userId);
    if (lastCart) {
        lastCart.isOpen = !!lastCart.isOpen;
    }
    return lastCart;
}

async function openCart(userInfo) {
    await validateOpenCartRequest(userInfo);
    let newCartRequest = {
        userId: userInfo.userId,
        isOpen: true,
        creationDate: new Date()
    }
    let cartId = await cartsDal.openCart(newCartRequest);
    let openedCart = {
        id: cartId,
        isOpen: true,
        creationDate: newCartRequest.creationDate
    }
    return openedCart;
}

// Inner server route, closes the cart after the user sent an add order request.
async function closeCart(cartId) {
    await cartsDal.closeCart(cartId);
}

// Validation that makes sure that the cart in the request belongs to the user that made the request.
async function validateCartForUser(cartId, userId) {
    let isCartBelongToUser = await cartsDal.validateCartForUser(cartId, userId);
    return isCartBelongToUser;
}

async function validateOpenCartRequest(userInfo) {
    // Validation that check if the open cart request was made by a user and not an admin.
    let role = userInfo.role;
    if (role != "user") {
        throw new Error("Invalid open cart request.");
    }
    
    // Validation the checks if the user's last cart is open.
    let lastCart = await getLastCart(userInfo.userId);
    if (lastCart?.isOpen) {
        throw new Error("You have a cart already.");
    }
}

module.exports = {
    getLastCart,
    openCart,
    closeCart,
    validateCartForUser
}