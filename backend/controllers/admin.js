const db = require('../models/index.js');


// GET 
exports.getAllUsersAdmin = (req, res, next) => {
    const Users = db.Users;

    Users.findAll({
        where : {
            permission: 0
        }
    })
        .then(users => res.status(200).json( users ))
        .catch(error => res.status(400).json( error ))
};



// GET 
exports.getOneUserAdmin = (req, res, next) => {
    const Users = db.Users;
    Users.findOne({ 
        attributes: [ 'id', 'firstName', 'lastName', 'email', 'avatar', 'permission' ],
        where: { id: req.params.id },
    })
    .then((user) => res.status(200).json({ user }))
    .catch(error => res.status(500).json({ error }));
}



// DELETE
exports.deleteOneUserAdmin = (req, res, next) => {
    const Users = db.Users;
    const Posts = db.Posts;
    const Comments = db.Comments;

    Comments.destroy({
        where: {
        user_id: req.params.id
        }
    })
    
    Posts.destroy({
        where: {
        user_id: req.params.id
        }
    })

    Users.destroy({ 
        where: { 
        id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
    .catch(error => res.status(500).json({ error }));
}



// PUT
exports.modifyUserAdmin = (req, res, next) => {
  
    const Users = db.Users;
    Users.update({ 
      permission: req.body.permission
    },
      {where: { id: req.params.id }
    })
    .then(user => { res.status(201).json(user)})
    .catch(error => res.status(500).json({ error }));
  };