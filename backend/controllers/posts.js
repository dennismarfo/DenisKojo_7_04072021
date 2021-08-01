// Logique metier des posts
// Imports
const fs = require('fs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const sequelize = require('../models/index.js');
const regex = /[a-zA-Z0-9 _.,'’(Ééèàû)&]+$/;

//Création d'un Post
exports.createPost = (req, res, next) => {
    // Autorisation d'authentification
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    const User = db.Users;

    User.findOne({ id: userId })
         .then(user => {
             if (user == null) {
                 return res.status(400).json({ error: 'Utilisateur non trouvé !'});
       }
     }).catch(err => res.status(500).json({ err }));

    const Posts = db.Posts;

    if (!regex.test(Posts.content)) {
        return res.status(500).json({ error: 'Caractères invalides !' });
    } else {
        const newPost = Posts.create({
            user_id: userId,
            content: req.body.content,
            attachments: req.body.content && req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null,

        })
        .then(newPost => res.status(201).json( newPost ))
        .catch(error => res.status(400).json({ error }));
    }
};

// Afichage de tout les posts
exports.getAllPosts = (req, res, next) => {
    
    const Posts = db.Posts;
    
    Posts.findAll({
        // order: ['updatedAt, DESC'],

    }).then(posts => res.status(200).json( posts ))
    .catch(error => res.status(400).json({ error: error }))
};

// Afficher un post

exports.getOnePost = (req, res, next) => {
    
    const Posts = db.Posts;

    Posts.findOne({
        where: {
            id: req.params.id
        },
        include: [ {
            model:db.Users,
            attributes: ['firstName', 'lastName', 'photo']
        }, {
            model:db.Comments,
            attributes: ['content', 'user_id']
        } ]
    }).then(post => res.status(200).json( post ))
    .catch(error => res.status(400).json({ error: "Pas de publication correspondante.", error: error }))
};

// Supprimer un post

exports.deletePost = (req, res, next) => {

    const Posts = db.Posts;

    Posts.findOne({
        where: {
            id: req.params.id
        }
    }).then(post => {
        if (post.attachments !== null) {
            const filename = post.attachments.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { 
            Posts.destroy({ where: {id: req.params.id} })
                .then(() => res.status(200).json({ message: 'Posts supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            });
        }
        Posts.destroy({ where: {id: req.params.id} }) 
            .then(() => res.status(200).json({ message: 'Posts supprimée !'}))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error: "Pas de publication correspondante.", error: error }))

};