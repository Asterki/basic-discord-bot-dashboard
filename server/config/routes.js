// Import our app
const { server } = require("../");

try {
    // Add our api endpoints to our app
    server.use("/api/auth", require("../api/auth"));
    server.use("/api/servers", require("../api/servers"));
} catch (err) {
    // Handle errors
    console.log("There was an error trying to load the routes");
    console.error(err);
}
