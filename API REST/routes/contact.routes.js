//! Importer Express
const express = require('express');

//! Importer le contrôleur contact.controller.js
const contactController = require('../controllers/contact.controller');

//! Créer uns nouvelle isntance de router
const router = express.Router();

//! Routes

//? Route de création d'un nouveau contact
router.post('/', contactController.create); //ici la route à appeler sera http://localhost:3000/contacts du fait du paramétrage dans index.js

//? Route de récupérations de l'ensemble des contacts
router.get('/', contactController.getAll);

//? Route pour récupérer un seul contact
router.get('/:id', contactController.getById);

//? Route pour modifier un contact
router.patch('/:id', contactController.updateById);

//? Route pour supprimer un contact
router.delete('/:id', contactController.deleteById);

//! Exporter ce router
module.exports = router;