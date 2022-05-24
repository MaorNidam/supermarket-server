const http = require("http");
const express = require("express");

const expressServer = express();
const httpServer = http.createServer(expressServer);
const socketIO = require("socket.io")(httpServer, {
    cors: {
        origin: ['http://localhost:3000']
    },
});
const jwt_decode = require('jwt-decode');

const socketServer = socketIO.listen(httpServer);

let userIdToSocketsMap = new Map();

socketServer.sockets.on("connection", socket => {
    console.log("Connection request");
    let userId = getUserIdFromSocket(socket);

    console.log("User id: " + userId);
    if (userIdToSocketsMap.has(userId)) {
        userIdToSocketsMap.get(userId).push(socket);
    }
    else {
        userIdToSocketsMap.set(userId, [socket])
    }

    console.log("One client has been connected... Total clients: " + userIdToSocketsMap.size);

    socket.on("disconnect", () => {
        let userId = getUserIdFromSocket(socket);

        // A valid userId means the user clicked "logout"
        let socketsArray = userIdToSocketsMap.get(userId);
        if (socketsArray.length > 1) {
            socketsArray = socketsArray.filter((usersSocket) => usersSocket != socket);
            userIdToSocketsMap.set(userId, socketsArray);
        }
        else {
            userIdToSocketsMap.delete(userId);
        }

        console.log(userId + " client has been disconnected. Total clients: " +
            userIdToSocketsMap.size);
    });

});

function getUserIdFromSocket(socket) {
    var handshakeData = socket.request;
    let token = handshakeData._query['token'];
    if (!token) {
        // Guest sign in as userID = -1
        return -1;
    }
    let decodedToken = jwt_decode(token);
    let userId = decodedToken.userId;
    return userId;
}

async function broadcast(actionName, data) {
    for (let [id, sockets] of userIdToSocketsMap) {
        for (let socket of sockets) {
            try {
                console.log("Action: " + actionName, id)
                socket.emit(actionName, data);
            }
            // Intentionally swallowing the exception
            // Preventing a situation where an error with the 2nd socket, will prevent
            // sending to the 3rd, fourth etc. 
            catch(e) {
                console.log(e);
            }
        }
    };
};

httpServer.listen(3002, () => console.log("Push server listening on http://localhost:3002"));

module.exports = {
    broadcast
}