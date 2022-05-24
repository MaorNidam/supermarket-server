const likesDal = require('../dal/categories-dal');

async function deleteVacationLikes(vacationId) {
    await likesDal.deleteVacationLikes(vacationId);
}

async function addLike(likeRequest) {
    let userType = likeRequest.tokenInfo.typeOfUser;
    if (userType != "user") {
        throw new Error("Invalid like request.");
    }
    await likesDal.addLike(likeRequest);
}

async function deleteLike(likeRequest) {
    let userType = likeRequest.tokenInfo.typeOfUser;
    if (userType != "user") {
        throw new Error("Invalid like request.");
    }
    await likesDal.deleteLike(likeRequest);
}

async function getUserLikes(userId) {
    let userLikes = await likesDal.getUserLikes(userId);
    let likesArray = [];
    for (let like of userLikes) {
        likesArray.push(like.vacation_id);
    }

    return likesArray;

}


module.exports = {
    deleteVacationLikes,
    addLike,
    deleteLike,
    getUserLikes
}