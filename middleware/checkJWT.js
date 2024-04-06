const jwt = require("jsonwebtoken");
const {User} = require("../db/models")
const checkJWT = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).send("Unauthorized : No token provided.");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).send("Unauthorized : Invalid token.");
        }

        const user = await User.findByPk(decoded.userId);  
        if(user){
            const {password, ...userWithoutPassword} = user;
            req.userData = userWithoutPassword;
            next();
        } else {
            return res.status(404).send("User not found.");
        }
        // const {password}

    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {checkJWT};