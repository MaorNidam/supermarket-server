const express = require('express');
const cors = require('cors');
const server = express();

// Links the correct module 
const productsController = require('./controllers/products-controller');
const categoriesController = require('./controllers/categories-controller');
const usersController = require('./controllers/users-controller');
const ordersController = require('./controllers/orders-controller');
const cartsController = require('./controllers/carts-controller');
const cartItemsController = require('./controllers/cart-items-controller');
const loginFilter = require('./middleware/login-filter');
const apiDocs = require('./utils/api-docs');
// The following line register middleware functions (server.use())

server.use(cors({ origin: ["http://localhost:4200" ]}));
// server.use(loginFilter());

// Extract the JSON from the body and create request.body object containing it:
server.use(express.json());

server.use("/products", productsController);
server.use("/users", usersController);
server.use("/categories", categoriesController);
server.use("/orders", ordersController);
server.use("/carts", cartsController);
server.use("/cart-items", cartItemsController);
server.use("/api-docs", apiDocs);

// The following line launches the node server, on port 3001.
server.listen(3001, () => console.log("Listening on http://localhost:3001"));