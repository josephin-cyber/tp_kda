const bcrypt= require('bcrypt');
const user= require('../models/user');
const jwt= require('jsonwebtoken');

exports.login = (req, res, next) => {
//    bcrypt.hash(req.body.pwd_utilisateur, 10)
//    .then(hash => {
//     const user = new user({
//       email_utilisateur: req.body.email_utilisateur,
//       pwd_utilisateur: hash
//     });
//     user.save()
//       .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//       .catch(error => res.status(400).json({ error }));
//   })
//   .catch(error => res.status(500).json({ error }));

user.findOne({ email_utilisateur: req.body.email_utilisateur })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.pwd_utilisateur, user.pwd_utilisateur)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

};