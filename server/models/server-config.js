const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const ServerConfig = new Schema({
    serverID: {
        type: String,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,
        unique: false,
        default: "!",
    },
});

// Create the model using the schema, in this order: Model name, Schema, and collection we're gonna use
const model = mongoose.model("ServerConfig", ServerConfig, "servers");

// Export our model
module.exports = model;
