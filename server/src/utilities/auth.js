const jwt = require("jsonwebtoken");

function generateToken(user){
    return jwt.sign({
        userId: user.id,
        role: user.role,
    }, user.secret_key, {
        subject: user.id.toString(),
        expiresIn: 1000 * 60 * 60 * 48, // 2 days
    });
}

module.exports = {
    generateToken,
};
