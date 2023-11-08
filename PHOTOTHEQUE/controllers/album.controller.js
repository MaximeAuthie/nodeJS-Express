//! Importer le modèle Album
const Album = require('../models/Album');

//! Importer path pour les jointures de path
const path = require ('path');

//! Importer File System pour vérifier si un répertoire existe
const fs = require('fs');

//! Fonction à exécuter lors de l'appel de la rouute "/albums" contenant la liste des albums
const albums = async (req, res) => {

    //? Récupérer la liste des albums
    const albums = await Album.find();
    console.log(albums);
    //? Afficher la vue
    res.render('albums', {
        title: "Liste des albums",
        albums: albums
    });
}

//! Fonction à exécuter lors de l'appel de la route "albums/:id"
const album = async (req, res) => {

    try {

        //? Récupérer 
        const album = await Album.findById(req.params.id)

        res.render('album', {
            title: `Album : ${album.title}`,
            album: album,
            errors: req.flash('error') //? dans addImage(), on redirige vers la page /album/:id qui exécute la fonction album => on vient récupérer ici le message d'erreur généré pour le passer à la vue
        });
    
    //? En cas d'erreur
    } catch (error) {

        //? Rediriger l'utilisateur vers la page 404
        console.log(error);
        res.redirect('/404');
    }
    
}

//! Fonction permettant d'uploader une image
const addImage = async (req, res) => {

    //? Récupérer les données de l'album concerné
    const album = await Album.findById(req.params.id);

    //? Vérifier si une image a bien été saisie => si non, on génère un message d'erreur
    if (!req?.files?.image) { // équivalent de if (!req.files || !req.files.image)
        req.flash('error', 'Veuillez renseigner un fichier');
        res.redirect(`/albums/${req.params.id}`);
        return;
    }

    //? Vérifier le format du fichier uploadé
    const image = req.files.image;
    console.log(image);

    if (image.mimetype != 'image/jpeg' && image.mimetype != 'image/png' && image.mimetype != 'image/jpg') {
        req.flash('error', 'Seuls les formats .jpg, jpeg et png sont acceptés');
        res.redirect(`/albums/${req.params.id}`);
        return;
    }
   
    //? Stocker le nom de l'image uploadé
    const imageName = image.name;
    
    //? Stocker le chemin du répertoire de l'album
    const folderPath = path.join(__dirname, '../public/uploads', album.id);

    //? Stocker le chemin de destination de l'image à uploader
    const localPath = path.join(folderPath, imageName);

    //? Créer le répertoire de destination de l'image s'il n'existe pas
    fs.mkdirSync(folderPath, { recursive:true }); //recursive:true => siginifie que si un des dossiers de l'arborescence n'existe pas ( par ex le dossier 'upload'), il le créera aussi

    //? Déplacer l'image grâce à la fonction .mv()
    await req.files.image.mv(localPath) // ici, image correspond au name de l'input dans la vue

    //? Ajouter le lien de l'image dans la BDD
    album.images.push(imageName); // on met à jour l'objet js
    await album.save(); // on sauvegarde les modifications apportées

    //? Rediriger vers la page de l'album (pour rester sur la m^me page)
    res.redirect(`/albums/${req.params.id}`);
}

//! Fonction contenant le code à exécuter lors de l'appel de la route parmettant d'afficher la page du formulaire de création d'un album
const createAlbumForm = (req, res) => {
    res.render('new-album', { 
        title: 'Nouvel album',
        errors: req.flash('error') // On fait passer à la vue d'éventuelles erreurs rencontrées (ici lors de la redirection en cas d'erreur de la fonction createAlbum() )
    });
}

//! Fonction à exécuter à la sousmission du formulaire de création d'un album
const createAlbum = async (req, res) => {

    try {

        //? Vérifier si le titre de l'album a bien été saisi
        if (!req.body.albumTitle) {

            //? Renseigner le message d'erreur qui sera transmit à la vue
            req.flash('error', "Veuillez renseigner un titre");

            //? Rediriger l'utilisateur vers la vue
            res.redirect('/albums/create');

            //? Mettre fin à la fonction
            return;

        }

        //? Création du nouveau document Album dans la BDD
        await Album.create({
            title: req.body.albumTitle,
        })

        //? Redirection de l'utilisateur vers la page "liste des albums"
        res.redirect('/albums');
    
    //? En cas d'erreur
    } catch (error) {
        console.log(error);
        //? Générer l'erreur qui sera passé à la vue 
        req.flash('error', "Erreur lors de la création de l'album");

        //? Rediriger l'utilisateur vers la page de création d'un album
        res.redirect('/albums/create');
    }
    

    
}

//! Exporter les fonctions
module.exports = {
    albums,
    album,
    addImage,
    createAlbumForm,
    createAlbum
}