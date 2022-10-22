const express = require("express");
const ServerConfigs = require("../models/server-config");

const router = express.Router();

router.post("/get-server-config", async (req, res) => {
    // If the user is not authenticated
    if (!req.isAuthenticated()) return res.status(403).send("unauthorized");

    // Check parameters
    if (!req.body.serverID || typeof req.body.serverID !== "string") return res.status(400).send("invalid-parameters");

    // Find the server in the bot's database using the provided id
    const serverConfig = await ServerConfigs.findOne({ serverID: req.body.serverID });

    // If there isn't a server, return
    if (!serverConfig) return res.status(400).send("server-not-found");

    // Send the configuration
    return res.send(serverConfig);
});

router.post("/save-server-config", async (req, res) => {
    // If the user is not authenticated
    if (!req.isAuthenticated()) return res.status(403).send("unauthorized");

    // Check parameters
    if (!req.body.newPrefix || !req.body.serverID) return res.status(400).send("missing-parameters");
    if (typeof req.body.newPrefix !== "string" || typeof req.body.serverID !== "string") return res.status(400).send("invalid-parameters");

    // Save the configuration
    await ServerConfigs.updateOne({ serverID: req.body.serverID }, { prefix: req.body.newPrefix });

    // Send the configuration
    return res.send("success");
});

module.exports = router;
