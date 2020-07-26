const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  id: { type: String, required: true },
  role_utilisateur: { type: String, required: true },
  nom_utilisateur: { type: String, required: true },
  email_utilisateur: { type: String, required:  true },
  pwd_utilisateur: { type: Number, required: true },
  nom_apprenant: { type: String, required: true },
  prenom_apprenant: { type: String, required: true },
  age_apprenant: { type: String, required: true },
  genre_apprenant: { type: String, required: true },
  niveau_etude_apprenant: { type: String, required: true },
  prenom_apprenant: { type: String, required: true },
  domaine_etude_apprenant: { type: String, required: true },
  competence_apprenant: { type: String, required: true },
  niveau_competence_apprenant: { type: String, required: true },
  classe_apprenant: { type: String, required: true },
  image_apprenant: { type: String, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);