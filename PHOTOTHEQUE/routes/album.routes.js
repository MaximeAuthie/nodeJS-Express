//? Importer Express
const express = require('express');

//? Importer le router d'Express
const router = express.Router();

//? Importer le controller album
const albumController = require('../controllers/album.controller');

//? Route pour la page quiliste l'ensemble des albums
router.get('/albums', albumController.albums);

//? Route pour la page d'un album
router.get('/albums/:id', albumController.album)

//? Route pour la page de création d'un nouvel album
router.get('/albums/create', albumController.createAlbumForm);

//? Route visité à la soumission du formulaire de création d'un album
router.post('/albums/create', albumController.createAlbum)

//? On exporte le router pour pouvoir l'utiliser dans le reste du projet
module.exports = router;