const fs = require('fs');
const jwt = require('jsonwebtoken');
const sequelize = require('../models/index.js');


const db = require('../models/index.js');


exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    const Comments = db.Comments;
    const Users = db.Users;

    Users.findOne({
        where: {
            id: userId
        }
    })
    .then(user => {
        Comments.create({
            user_id: user.id,
            post_id: req.params.id,
            content: req.body.content
        })
        .then(newComment => res.status(200).json( newComment ))
        .catch(error => res.status(500).json( error ))
    })
    .catch(error => res.status(500).json( error ))
};

exports.getAllComments = (req, res, next) => {
    
    const Comments = db.Comments;

    Comments.findAll({
        where: {
            post_id: req.params.id
        }
    }).then(comments => res.status(200).json( comments ))
    .catch(error => res.status(400).json({ error: "Pas de commentaires correspondants.", error: error }))
};

exports.deleteComments = (req, res, next) => {

    const Comments = db.Comments;

    Comments.destroy({
        where: {
            post_id: req.params.post_id,
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: 'Commentaires supprimés!'}))
    .catch(error => res.status(500).json( error ))

};

exports.deleteComments = (req, res, next) => {

    const Comments = db.Comments;

    Comments.destroy({
        where: {
            post_id: req.params.post_id,
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: 'Commentaires supprimés!'}))
    .catch(error => res.status(500).json( error ))

};