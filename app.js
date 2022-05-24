const express = require('express');
const cors = require('cors');
const server = express();

// Links the correct module 
const productsController = require('./controllers/products-controller');
const usersController = require('./controllers/users-controller');
const ordersController = require('./controllers/orders-controller');
const cartsController = require('./controllers/carts-controller');
const cartItemsController = require('./controllers/cart-items-controller');
const loginFilter = require('./middleware/login-filter');
// The following line register middleware functions (server.use())

// Enables call from localhost:3000, fixes the CORS issue.
server.use(cors({ origin: ["http://localhost:3000","http://localhost:4200" ]}));
server.use(loginFilter());

// Extract the JSON from the body and create request.body object containing it:
server.use(express.json());

//Tells the server where to go when the rest request is "http://localhost:3000/vacation"
server.use("/products", productsController);
server.use("/users", usersController);
server.use("/orders", ordersController);
server.use("/carts", cartsController);
server.use("/cartItems", cartItemsController);

// The following line launches the node server, on port 3001.
server.listen(3001, () => console.log("Listening on http://localhost:3001"));