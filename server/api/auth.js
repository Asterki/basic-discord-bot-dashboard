const express = require("express");
const passport = require("passport");

// Create our router
const router = express.Router();

// Redirect to the discord's auth page
router.get("/redirect", passport.authenticate("discord"));

// When returning from that page, authenticate and generate a session
router.get(
    "/callback",
    // Specify the auth strategy that we declared in the server/config/auth
    passport.authenticate("discord", {
        failureRedirect: "/", // If the auth failed
    }),
    function (req, res) {
        res.redirect("/dashboard"); // Successful auth
    }
);

module.exports = router;
