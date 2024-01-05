const jwt = require("jsonwebtoken");
const secretPass ="secret";

// Middleware for handling auth

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const Token = req.headers.authorization;
    try {
        req.decoded = jwt.verify(Token, secretPass);
        next();
    } catch (error) {
        res.json({
            msg: "token is invalid"
        })
    }

    
}


module.exports = adminMiddleware;

