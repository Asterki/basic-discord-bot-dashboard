// Dependencies
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");

const { server } = require("../");

try {
    // Requests
    server.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    server.use(bodyParser.json());
    server.use(cookieParser());
    server.use(compression());

    // Basic security, which is disabled in development mode
    if (process.env.NODE_ENV == "production") {
        server.use(helmet.contentSecurityPolicy());
        server.use(
            helmet.crossOriginEmbedderPolicy({
                policy: "require-corp",
            })
        );
        server.use(
            helmet.crossOriginOpenerPolicy({
                policy: "same-origin",
            })
        );
        server.use(
            helmet.crossOriginResourcePolicy({
                policy: "same-origin",
            })
        );
        server.use(
            helmet.dnsPrefetchControl({
                allow: false,
            })
        );
        server.use(
            helmet.expectCt({
                maxAge: 0,
            })
        );
        server.use(
            helmet.frameguard({
                action: "sameorigin",
            })
        );
        server.use(
            helmet.hsts({
                maxAge: 15552000,
                includeSubDomains: true,
            })
        );
        server.use(
            helmet.permittedCrossDomainPolicies({
                permittedPolicies: "none",
            })
        );
        server.use(
            helmet.referrerPolicy({
                policy: "no-referrer",
            })
        );
        server.use(helmet.ieNoOpen());
        server.use(helmet.hidePoweredBy());
        server.use(helmet.noSniff());
        server.use(helmet.originAgentCluster());
        server.use(helmet.xssFilter());
    }

    console.log(`Middleware loaded`);
} catch (err) {
    console.log(`There was an error loading the middleware`);
    console.log(err);
}
