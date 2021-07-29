
const jwt = require('jsonwebtoken');
const db = require('../models/index.js');


module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    db.Users.findOne({
            where: {
                id: userId
            }
        })
        .then(user => {
            if (user.permission == true) {
                next();
            } else {
                res.status(401).json({
                    message: "Vous n'avez pas la permission d'accéder à ses données"
                })
            }
        })
        .catch(error => res.status(500).json({
            error
        }));
};