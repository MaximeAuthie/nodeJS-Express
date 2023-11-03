//? Importer le modèle Album
const Album = require('../models/Album');

//? Création d'une fonction contenant le code à exécuter lors de l'appel de la route parmettant d'afficher la page du formulaire de création d'un album
const createAlbumForm = (req, res) => {
    res.render('new-album', { title: 'Nouvel album'});
}

//? Créer une fonction à exécuter à la sousmission du formulaire de création d'un album
const createAlbum = async (req, res) => {

    //? Création du nouveau document Album dans la BDD 
    await Album.create({
        title: req.body.albumTitle,
    })

    //? Redirection de l'utilisateur vers l'accueil
    res.redirect('/');
}

//? Exporter les fonctions
module.exports = {
    createAlbumForm,
    createAlbum
}