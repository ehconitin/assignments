const jwt = require("jsonwebtoken");
const secretPass ="secret";

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
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

module.exports = userMiddleware;