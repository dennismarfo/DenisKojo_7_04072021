const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token);
        console.log(process.env.SECRET_TOKEN);
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        console.log(decodedToken);
        const userId = decodedToken.userId;

        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            req.userId = userId
            next();
        }

    } catch (error) {
        res.status(401).json({
            error: new Error('Requête non authentifiée !')
        });
    }
}