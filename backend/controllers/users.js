const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require('../models/index.js');

//REGEX DE CONNEXION 
const mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // Au moins une majuscule, un chiffre. Minimum 8 caractères.


//Creation des fonctions

exports.signup = (req, res, next) => {
    const lastname = req.body.lastName;
    const firstname = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;

    console.log(req);

    if (lastname == null || firstname == null || email == null || password == null) {
        return res.status(400).json({ error: "Vous n'avez pas rempli tous les champs obligatoires."}) 
        } else if (!passwordRegex.test(password)) {
           return res.status(400).json({ error: "Le mot de passe doit comprendre une majuscule et 1 chiffre et doit être de 8 caractères minimum."})
    } else if (!mailRegex.test(email)) {
        return res.status(400).json({ error: "Email non valide." })
    }

    const Users = db.Users;



        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new Users({
                    lastName: lastname,
                    firstName: firstname,
                    email: email,
                    password: hash,
                    permission: false,
                    avatar: "http://localhost:3000/images/avatar.png"
                });
                user.save()
                    .then(user => res.status(201).json( user ))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));




};

exports.login = (req, res, next) => {
    const Users = db.Users;

    Users.findOne({ 
      where: {email: req.body.email }})
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé !' });
            }
            console.log(req.body);
         bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(400).json({ error: 'Mot de passe incorrect !' });
                }
            
                res.status(200).json({
                 user,
                 token: jwt.sign(
                    { userId: user.id },
                    process.env.SECRET_TOKEN,
                    { expiresIn: '24h' }
                    )

                })
            })
            .catch(error => res.status(500).json({ error }));   
        })
        .catch(error => res.status(500).json({ error }));

};

// DELETE
exports.delete = (req, res, next) => {

    const Users = db.Users;
  
    Users.findOne({
      where: {
        id: req.params.id
      }
    }).then(user => {
      if (user.avatar !== 'http://localhost:3000/images/avatar.png') {
      const filename = user.avatar.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Users.destroy({ where: { id: req.params.id }})
          .then(() => res.status(200).json({ message : 'Utilisateur supprimé !' }))
          .catch(error => res.status(400).json( error ))
        })
      } else {
        Users.destroy({ 
          where: { 
            id: req.params.id
          }
        })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
        .catch(error => res.status(500).json({ error }));
      }
    })
  };

  // GET
exports.getOneUser = (req, res, next) => {
  const token = req.headers.authorization; 
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN); 
  const userId = decodedToken.userId;

  const Users = db.Users;

  Users.findOne({ 
    attributes: [ 'id', 'firstName', 'lastName', 'email', 'avatar', 'permission' ],
    where: { id: userId },
  })
  .then((user) => res.status(200).json({ user }))
  .catch(error => res.status(500).json({ error }));
};

// PUT
exports.modifyUser = (req, res, next) => {
  const token = req.headers.authorization; 
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN); 
  const userId = decodedToken.userId;

  const Users = db.Users;

    Users.update({ 
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      photo: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: req.body.avatar
    },
      {where: { id: userId }
    })
    .then(newUser => { res.status(201).json( newUser )})
    .catch(error => res.status(500).json({ error }));
};