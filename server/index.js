const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

const ServerConfigs = require("./models/server-config");

app.prepare().then(() => {
    // Load the middleware
    require("./config/middleware");

    // Load the auth system
    require("./config/auth");

    // Connect to the database
    require("./config/databases");

    // Set the app's routes
    require("./config/routes");

    // Next.js routing
    server.all("*", (req, res) => {
        return handle(req, res);
    });

    // Start the server
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});

// Export the Express.js app, since we'll use it in other files
module.exports = { server };
