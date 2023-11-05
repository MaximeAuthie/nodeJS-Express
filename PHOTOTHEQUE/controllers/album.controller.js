//? Importer le modèle Album
const Album = require('../models/Album');

//? Création d'une fonction contenant le code à exécuter lors de l'appel de la route parmettant d'afficher la page du formulaire de création d'un album
const createAlbumForm = (req, res) => {
    res.render('new-album', { 
        title: 'Nouvel album',
        errors: req.flash('error') // On fait passer à la vue d'éventuelles erreurs rencontrées (ici lors de la redirection en cas d'erreur de la fonction createAlbum() )
    });
}

//? Créer une fonction à exécuter à la sousmission du formulaire de création d'un album
const createAlbum = async (req, res) => {

    try {

        //? Création du nouveau document Album dans la BDD
        if (!req.body.title) {

            //? Renseigner le message d'erreur qui sera transmit à la vue
            req.flash('error', "Veuillez renseigner un titre");

            //? Rediriger l'utilisateur vers la vue
            res.redirect('/albums/create');

            //? Mettre fin à la fonction
            return;

        }
        await Album.create({
            title: req.body.albumTitle,
        })

        //? Redirection de l'utilisateur vers l'accueil
        res.redirect('/');
    
    //? En cas d'erreur
    } catch (error) {
        
        //? Générer l'erreur qui sera passé à la vue 
        req.flash('error', "Erreur lors de la création de l'album");

        //? Rediriger l'utilisateur vers la page de création d'un album
        res.redirect('/albums/create');
    }
    

    
}

//? Exporter les fonctions
module.exports = {
    createAlbumForm,
    createAlbum
}