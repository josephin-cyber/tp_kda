const Thing = require('../models/thing');
const fs= require('fs');


exports.createThing= (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    const thing = new Thing({
      ...thingObject
    //  image_apprenant: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteThing= (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/image/')[1];
      fs.unlink(`image/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyThing= (req, res, next) => {
    const thingObject = req.file ?
    {
      ...JSON.parse(req.body.thing),
      image_apprenant: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    } : { ...req.body };
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.getOneThing= (req, res, next) => {
    Thing.findOne({ _id_utilisateur: req.params.id_utilisateur })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  };

exports.getAllThing= (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  };