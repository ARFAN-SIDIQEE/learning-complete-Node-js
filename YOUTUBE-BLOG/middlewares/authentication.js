
const { validateTOken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const token = req.cookies?.[cookieName];

        console.log("Cookie name:", cookieName);
        console.log("Token received:", !!token);

        req.user = null;
        res.locals.user = null;

        if (!token) {
            return next();
        }

        try {
            const userPayload = validateTOken(token);

            req.user = userPayload;
            res.locals.user = userPayload;

            console.log("User logged in:", userPayload.email);
        } catch (error) {
            console.log("JWT error:", error.message);
        }

        next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
