const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const expressSession = require("express-session");
const mongoStore = require("connect-mongo");

const { server } = require("../");

// The scopes we'll need
const scopes = ["identify", "guilds"];

// Serialize users
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Add the middleware create sessions
server.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        // Store the sessions to our MongoDB database, so users don't have to re login each time the server restarts
        store: mongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
        // Cookie configuration
        name: "session",
        cookie: {
            secure: process.env.COOKIE_SECURE == "true",
            maxAge: parseInt(process.env.COOKIE_MAX_AGE) || 604800000,
            sameSite: true,
        },
    })
);

// Add passport.js middleware to our server
server.use(passport.initialize());
server.use(passport.session());

// Use passport.js's Discord strategy
passport.use(
    new DiscordStrategy(
        {
            // Set passport.js's configuration for the strategy
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: `${process.env.HOST}/api/auth/callback`,
            scope: scopes,
        },
        (accessToken, refreshToken, profile, cb) => {
            console.log(profile);
            // On login, return the user
            return cb(null, profile);
        }
    )
);
