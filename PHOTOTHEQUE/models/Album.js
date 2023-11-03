//? Importer Mongoose pour créer le schéma et le modèle
const mongoose = require('mongoose');

//? Créer le schéma d'un album
const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    images: [String] // Signifie tableau de chaines de caractères
}, { timestamps: true});

//? Exporter le modèle du schéma Album
module.exports = mongoose.model('Album', albumSchema);